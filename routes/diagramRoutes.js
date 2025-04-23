const express = require('express');
const { getAllDiagrams, getDiagramById, createDiagram, updateDiagram, deleteDiagram,collaborate,getDiagramsByUserId } = require('../controllers/diagramController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllDiagrams);
router.get('/:id', authMiddleware, getDiagramById);
router.post('/', authMiddleware, createDiagram);
router.put('/:id', authMiddleware, updateDiagram);
router.delete('/:id', authMiddleware, deleteDiagram);
router.post('/collaborate', authMiddleware, collaborate);
router.get('/get/byId', authMiddleware, getDiagramsByUserId);

module.exports = router;
