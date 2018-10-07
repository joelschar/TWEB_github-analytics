function getReposLanguagesStats(reposLanguages = []) {
  const stats = {};
  const countLanguages = o => {
    Object.keys(o).forEach(key => {
      const value = o[key];
      const current = stats[key] || 0;
      stats[key] = current + value;
    });
  };
  reposLanguages.forEach(countLanguages);
  return stats;
}

function getContributorsName(data) {
  const repos = data.repos;
  const contributors = data.contributors;

  const listrepos = {};

  // parcours les bloc de contributeurs (correspond aux repositorys)
  for (let i = 0; i < contributors.length; i++) {
    const name = [];

    let ok = false;

    // parcours les contributeurs de chaque répos
    for (let j = 0; j < contributors[i].length; j++) {
      name.push(contributors[i][j].login);

      // si le username choisi apparait dans la liste des contributeurs ok = true
      if (contributors[i][j].login === data.username) {
        ok = true;
      }
    }

    // si le username est dans la liste de contributeurs on crée l'objet avec comme propriété
    // le nom du repos et comme valeur la liste de contributeurs.
    if (ok) {
      const repository = repos[i].full_name;
      listrepos[repository] = name;
    }
  }
  return listrepos;
}

module.exports = {
  getReposLanguagesStats,
  getContributorsName,
};
