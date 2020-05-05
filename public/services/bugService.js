const baseUrl = '/api/bug';
var gBugs = [];

export default {
  query,
  remove,
  save,
};

function query() {
  return axios
    .get(baseUrl)
    .then((res) => res.data)
    .then((bugs) => {
      gBugs = bugs;
      return bugs;
    });
}

function remove(bugId) {
  return axios.delete(`${baseUrl}/${bugId}`).then(() => {
    const bugIdx = _getIdxById(bugId);
    gBugs.splice(bugIdx, 1);
  });
}

function save(bug) {
  if (bug._id) {
    return axios
      .put(`${baseUrl}/${bug._id}`, bug)
      .then((res) => res.data)
      .then((savedBug) => {
        const bugIdx = _getIdxById(savedBug._id);
        gBugs[bugIdx] = savedBug;
        return savedBug;
      });
  } else {
    return axios
      .post(baseUrl, bug)
      .then((res) => res.data)
      .then((savedBug) => {
        gBugs.unshift(savedBug);
        return savedBug;
      });
  }
}

function _getIdxById(bugId) {
  return gBugs.findIndex((bug) => bug._id === bugId);
}
