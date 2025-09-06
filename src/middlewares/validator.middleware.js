export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Si es un ZodError, usamos issues (no errors)
    /**if (error.issues) {
      return res
        .status(400).
        json(error.issues.map((i) => i.message));
    }

    console.error('[validateSchema]', error);
    return res.status(500).json({ error: 'Error interno de validación' });
    */
    return res
      .status(400)
      .json(error.issues.map((error) => error.message));
  }
};
