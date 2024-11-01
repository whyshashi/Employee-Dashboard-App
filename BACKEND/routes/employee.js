const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Employee = require('../models/Employee');


router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find({ createdBy: req.user.id });
    res.json(employees);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


router.post('/',  async (req, res) => {
  res.send(hihi);
  try {
    const { name, position, salary, department } = req.body;
    const employee = new Employee({
      name,
      position,
      salary,
      department
    });
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update 
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, position, salary, department } = req.body;
    let employee = await Employee.findById(req.params.id);
    
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    if (employee.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, position, salary, department },
      { new: true }
    );
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete 
router.delete('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    if (employee.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Employee.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router; 