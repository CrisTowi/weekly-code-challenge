const URL = "https://pokeapi.co/api/v2/type";

const generateTypeMatchup = async () => {
  const cache = {};
  const typesData = await fetch(URL);
  const { results } = await typesData.json();

  for (let i = 0; i < results.length; i++) {
    const typeData = await fetch(results[i].url);
    const { damage_relations } = await typeData.json();

    cache[results[i].name] = damage_relations;
  }

  return (type) => {
    const pokemonTypeCache = cache[type];

    if (!pokemonTypeCache) {
      console.log(
        `${type} is not a valid Pokémon type. Are we still talking about Pokemon? \n`
      );

      return;
    }

    let result = `${type} is weak against `;

    for (let i = 0; i < pokemonTypeCache.double_damage_from.length; i++) {
      if (i === pokemonTypeCache.double_damage_from.length - 1) {
        result += `and ${pokemonTypeCache.double_damage_from[i].name}`;
      } else {
        result += `${pokemonTypeCache.double_damage_from[i].name}, `;
      }
    }

    result += ". Strong against ";

    for (let i = 0; i < pokemonTypeCache.double_damage_to.length; i++) {
      if (i === pokemonTypeCache.double_damage_to.length - 1) {
        result += `and ${pokemonTypeCache.double_damage_to[i].name}.`;
      } else {
        result += `${pokemonTypeCache.double_damage_to[i].name}, `;
      }
    }

    console.log(`${result} \n`);
  };
};

(async () => {
  const typeMatchup = await generateTypeMatchup();

  typeMatchup("grass");
  typeMatchup("fire");
  typeMatchup("Cassidoo");
  typeMatchup("Chris");
})();
