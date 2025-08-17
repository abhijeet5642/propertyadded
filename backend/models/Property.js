import mongoose from 'mongoose';



const propertySchema = mongoose.Schema(

{

title: { type: String, required: true },

description: { type: String, required: true },

propertyType: { type: String, required: true },

price: { type: Number, required: true },

area: { type: Number, required: true }, // Mapped from 'units' on the frontend

bedrooms: { type: Number, default: 0 },

bathrooms: { type: Number, default: 0 },

furnishing: { type: String, default: 'Unfurnished' },

possession: { type: String, default: 'Immediate' },

builtYear: { type: Number },

location: { type: String, required: true }, // Combined string for display

locality: { type: String, required: true },

city: { type: String, required: true },

images: [{ type: String }], // Array of image URLs

videoUrls: [{ type: String }],

amenities: [{ type: String }],

locationCoords: {

lat: { type: Number },

lng: { type: Number },

},

// Reference to the admin/agent who listed the property

agent: {

type: mongoose.Schema.Types.ObjectId,

required: true,

ref: 'User',

},

submittedBy: { type: String }, // Name of the broker if provided

},

{

timestamps: true, // Automatically adds createdAt and updatedAt fields

}

);



const Property = mongoose.model('Property', propertySchema);



export default Property;