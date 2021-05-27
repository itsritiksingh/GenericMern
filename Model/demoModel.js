const mongoose =   require('mongoose');  
const Schema = mongoose.Schema;


const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed", "To be scheduled"],
    required: true,
  },
});


module.exports = projectModal = mongoose.model("projectModal",projectSchema);