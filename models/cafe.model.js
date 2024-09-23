// models/cafe.model.js

import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  preparado: String,
  tamano: String,
  img: String,
  precio: Number,
  eliminado: { type: Boolean, default: false }
});

const Cafe = mongoose.model('Cafe', cafeSchema);

export default Cafe;
