import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err? console.log(err) : console.log('Connected to database'));

app.get('/api/userPreferences', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/weather_app/userPreferences');
    if (!response.ok) {
      throw new Error('Error fetching user preferences');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ message: 'Error fetching user preferences' });
  }
});

app.post('/api/userPreferences', async (req, res) => {
  try {
    const newPreference = req.body;
    const response = await fetch('http://localhost:3000/weather_app/userPreferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPreference),
    });
    if (!response.ok) {
      throw new Error('Error creating user preference');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error creating user preference:', error);
    res.status(500).json({ message: 'Error creating user preference' });
  }
});

app.put('/api/userPreferences/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPreference = req.body;
    const response = await fetch(`http://localhost:3000/weather_app/userPreferences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPreference),
    });
    if (!response.ok) {
      throw new Error('Error updating user preference');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error updating user preference:', error);
    res.status(500).json({ message: 'Error updating user preference' });
  }
});

app.delete('/api/userPreferences/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`http://localhost:3000/weather_app/userPreferences/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting user preference');
    }
    res.json({ message: 'User preference deleted successfully' });
  } catch (error) {
    console.error('Error deleting user preference:', error);
    res.status(500).json({ message: 'Error deleting user preference' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});