// File: controllers/diagramController.js
const Diagram = require('../models/Diagram');
const Colaboracion = require('../models/Colaboracion');
const crypto = require('crypto');

const User = require('../models/User'); // Asegúrate de tener el modelo de User importado

exports.getDiagramsByUserId = async (req, res) => {
    console.log('entra getDiagramsByUserId')
    const userId = req.user.userId; // El ID del usuario autenticado, se obtiene desde el middleware de autenticación

    try {
        // Buscar las colaboraciones donde el usuario participa
        const colaboraciones = await Colaboracion.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: Diagram,  // Incluir los datos del diagrama asociado
                    as: 'Diagram'    // Alias, según tu modelo de asociación
                }
            ]
        });

        if (!colaboraciones.length) {
            return res.status(404).json({ message: 'No diagrams found for this user' });
        }

        // Crear la respuesta con el diagrama y el rol del usuario en cada uno
        const diagramsWithRole = colaboraciones.map(colab => ({
            diagram: colab.Diagram.dataValues, // Acceder a dataValues del Diagrama
            role: colab.role // El rol del usuario en el diagrama (admin o colaborador)
        }));

        res.json(diagramsWithRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDiagrams = async (req, res) => {
    try {
        const diagrams = await Diagram.findAll();
        res.json(diagrams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDiagramById = async (req, res) => {
    try {
        const diagram = await Diagram.findByPk(req.params.id);
        if (!diagram) return res.status(404).json({ message: 'Diagram not found' });
        res.json(diagram);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createDiagram = async (req, res) => {
    try {

        const { name } = req.body;
            console.log(name)
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Generar un roomCode único
        const roomCode = crypto.randomBytes(3).toString('hex');  // Genera un código de 6 caracteres hexadecimales

        // Crear el diagrama en la base de datos
        const diagram = await Diagram.create({
            name,
            roomCode  // Guarda el roomCode junto con el nombre
        });
          
        const userId = req.user.userId; // Este valor debería venir del middleware de autenticación
    
        // Crear la relación en UserDiagram con el rol de 'admin'
        await Colaboracion.create({
            UserId: userId,            // ID del usuario
            DiagramId: diagram.id,     // ID del diagrama recién creado
            role: 'admin'              // Asignar el rol de admin
        });
        res.status(201).json(diagram);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDiagram = async (req, res) => {
    try {
        const diagram = await Diagram.findByPk(req.params.id);
        if (!diagram) return res.status(404).json({ message: 'Diagram not found' });
        await diagram.update(req.body);
        res.json(diagram);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDiagram = async (req, res) => {
    console.log('delete');
    try {
        const diagramId = req.params.id;

        // Primero, verifica si el diagrama existe
        const diagram = await Diagram.findByPk(diagramId);
        if (!diagram) return res.status(404).json({ message: 'Diagram not found' });

        // Eliminar las colaboraciones relacionadas
        await Colaboracion.destroy({ where: { DiagramId: diagramId } });

        // Luego, eliminar el diagrama
        await diagram.destroy();

        res.json({ message: 'Diagram deleted' });
    } catch (error) {
        console.error("Error deleting diagram:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.collaborate = async (req, res) => {
    const { roomCode } = req.body; // Suponemos que codeRoom se envía en el cuerpo de la solicitud

    try {
        // Buscar el diagrama por codeRoom
        const diagram = await Diagram.findOne({ where: { roomCode } });

        if (!diagram) {
            return res.status(404).json({ message: 'Diagram not found' });
        }

        // Obtener el ID del usuario autenticado
        const UserId = req.user.userId;

        // Comprobar si ya existe la relación
        const existingUserDiagram = await Colaboracion.findOne({
            where: {
                UserId,
                DiagramId: diagram.id
            }
        });

        if (existingUserDiagram) {
            return res.status(400).json({ message: 'User already collaborating on this diagram' });
        }

        // Crear la relación en UserDiagram con el rol de 'collaborator'
        const colaboracion=  await Colaboracion.create({
            UserId: UserId,            // ID del usuario
            DiagramId: diagram.id,     // ID del diagrama encontrado
            role: 'colaborador'       // Asignar el rol de colaborador
        });

        // Responder con un mensaje de éxito
        res.status(201).json({ message: 'User added as collaborator', colaboracion});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};