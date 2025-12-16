const Contact = require('../models/Contact');

// @desc    Save contact message to database
// @route   POST /api/contact
// @access  Public
const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        // Save to database
        const contact = await Contact.create({
            name,
            email,
            message
        });

        console.log('New contact message received:', {
            id: contact._id,
            from: name,
            email: email
        });

        res.status(200).json({
            success: true,
            message: 'Message received! I\'ll get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get all contact messages (for admin)
// @route   GET /api/contact
// @access  Public (should be protected in production)
const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Public (should be protected in production)
const deleteContactMessage = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (contact) {
            await contact.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    sendContactEmail,
    getContactMessages,
    deleteContactMessage
};

