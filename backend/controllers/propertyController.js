import Property from "../models/Property.js";

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate("agent", "fullName email");
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "agent",
      "fullName email"
    );

    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
const createProperty = async (req, res) => {

   console.log('--- Multer Debug ---');
  console.log('Request Body:', req.body); // This will show all text fields
  console.log('Request Files:', req.files); // This should show your uploaded files
  console.log('--------------------'); 
  
  const {
    title,
    description,
    propertyType,
    price,
    units, // Corresponds to 'area'
    bedrooms,
    bathrooms,
    furnishing,
    possession,
    builtYear,
    locality,
    city,
    videoUrls,
    lat,
    lng,
    amenities,
    submittedBy,
  } = req.body;

  try {
    // --- Step 1: Explicitly check for required fields ---
    // This provides clearer error messages than the default Mongoose validation.
    if (!title || !description || !propertyType || !price || !units || !locality || !city) {
      return res.status(400).json({ message: 'Please fill all required fields: Title, Description, Type, Price, Area, Locality, and City.' });
    }

    // --- Step 2: Safely parse numbers and provide defaults ---
    // This helper function prevents the "NaN" error by handling empty strings.
    const safeParseNumber = (value, defaultValue = null) => {
      if (value === null || value === undefined || value === '') {
        return defaultValue;
      }
      const num = Number(value);
      return isNaN(num) ? defaultValue : num;
    };

    // Get the filenames from multer if they exist
    const imageFilenames = req.files ? req.files.map(file => file.filename) : [];

    // --- Step 3: Create the property with clean, validated data ---
    const property = await Property.create({
      title,
      description,
      propertyType,
      price: safeParseNumber(price), // Use the safe parser for all numbers
      area: safeParseNumber(units),
      bedrooms: safeParseNumber(bedrooms, 0), // Default to 0 if empty
      bathrooms: safeParseNumber(bathrooms, 0), // Default to 0 if empty
      furnishing,
      possession,
      builtYear: safeParseNumber(builtYear), // Defaults to null if empty
      location: `${locality}, ${city}`,
      locality,
      city,
      images: imageFilenames,
      videoUrls: JSON.parse(videoUrls || '[]'),
      amenities: JSON.parse(amenities || '[]'),
      locationCoords: {
        lat: safeParseNumber(lat), // Defaults to null if empty
        lng: safeParseNumber(lng), // Defaults to null if empty
      },
      agent: req.user._id,
      submittedBy,
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server Error while creating property' });
  }
};


// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = async (req, res) => {
  // This function would also need to be updated to handle file uploads
  // if you want to update images. For now, it only updates text fields.
  const {
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
  } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      property.title = title || property.title;
      property.description = description || property.description;
      property.price = price || property.price;
      property.location = location || property.location;
      property.bedrooms = bedrooms || property.bedrooms;
      property.bathrooms = bathrooms || property.bathrooms;
      property.area = area || property.area;
      property.images = images || property.images;

      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      await property.deleteOne();
      res.json({ message: "Property removed" });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
