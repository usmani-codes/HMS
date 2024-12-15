import express from 'express';
import {
    getDisciplinaryActions,
    getDisciplinaryAction,
    createDisciplinaryAction,
    updateDisciplinaryAction,
    deleteDisciplinaryAction,
    getDisciplinaryActionsCount
} from '../controllers/disciplinaryActions.js';

export const router = express.Router();

router.get('/disciplinary-actions', getDisciplinaryActions);
router.get('/disciplinary-actions/:id', getDisciplinaryAction);
router.post('/disciplinary-actions', createDisciplinaryAction);
router.put('/disciplinary-actions/:id', updateDisciplinaryAction);
router.delete('/disciplinary-actions/:id', deleteDisciplinaryAction);
router.get('/disciplinary-actions/count', getDisciplinaryActionsCount);
