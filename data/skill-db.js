export { 
	find,
  findById,
  create,
  findByIdAndDelete,
}

const skills = [
  {text: 'JavaScript', learned: true, _id: 125223},
  {text: 'HTML', learned: false, _id: 127904},
  {text: 'CSS', learned: false, _id: 139608},
]

function findByIdAndDelete(id, callback) {
  try { 
    // Find the index based on the _id of the todo object
    const idx = skills.findIndex(skill => skill._id == parseInt(id))
    const deletedSkill = skills.splice(idx, 1)
    if (!deletedSkill.length ) throw new Error ('No skill was deleted')
    return callback(null, deletedSkill[0])
  } catch(error) {
    return callback(error, null)
  }
}

function create(skill, callback) {
  // Add the id
  skill._id = Date.now() % 1000000
  // New skills wouldn't be done
  skill.learned = false
  skills.push(skill)
  return callback(null, skill)
}

const findById = (id, callback) =>{
  try {
    const skill = skills.find(skill => skill._id === parseInt(id))
    if (!skill) throw new Error ('No skill was found')
    return callback(null, skill)
  } catch (error) {
    console.log(error)
    return callback(error, null)
  }
}

const find = (conditions, callback) => {
  // see if this works, if not, execute the code in the catch block
  try {
    // make sure that conditions is an object - if not throw a TypeError
    if (!(conditions instanceof Object)){
      throw new TypeError('Please pass in an object')
    }
    let conditionKeys = Object.keys(conditions)
    // If the object is empty, return all the todos
    if (conditionKeys.length === 0) return callback(null, skills)
    // make sure that all the properties on the conditions exists on the object
    if (!conditionKeys.every((i) => Object.keys(skills[0]).includes(i))) {
      throw new Error('Must find by properties that exist on the array items')
    } else {
			// Finally actually find what we're looking for
      return callback(null, skills.filter((skill) =>
        conditionKeys.every((propKey) => skill[propKey] === conditions[propKey])
      ))
    }
	// deal with errors
  } catch (error) {
    console.log(error)
    callback(error, [])
  }
}