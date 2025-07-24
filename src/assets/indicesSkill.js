function transcribirSkill(numero) {
  let nombreSkill = "";

  switch (numero) {
    case "SK1":
      nombreSkill = "Resistencia Magica";
      break;
    case "SK2":
      nombreSkill = "Magia";
      break;
    case "SK3":
      nombreSkill = "Robar";
      break;
    case "SK4":
      nombreSkill = "Tacticas de combate";
      break;
    case "SK5":
      nombreSkill = "Combate con armas";
      break;
    case "SK6":
      nombreSkill = "Meditar";
      break;
    case "SK7":
      nombreSkill = "Apuñalar";
      break;
    case "SK8":
      nombreSkill = "Ocultarse";
      break;
    case "SK9":
      nombreSkill = "Supervivencia";
      break;
    case "SK10":
      nombreSkill = "Talar arboles";
      break;
    case "SK11":
      nombreSkill = "Comercio";
      break;
    case "SK12":
      nombreSkill = "Defensa con escudos";
      break;
    case "SK13":
      nombreSkill = "Pesca";
      break;
    case "SK14":
      nombreSkill = "Mineria";
      break;
    case "SK15":
      nombreSkill = "Carpinteria";
      break;
    case "SK16":
      nombreSkill = "Herreria";
      break;
    case "SK17":
      nombreSkill = "Liderazgo";
      break;
    case "SK18":
      nombreSkill = "Domar animales";
      break;
    case "SK19":
      nombreSkill = "Armas de proyectiles";
      break;
    case "SK20":
      nombreSkill = "Combate sin armas";
      break;
    case "SK21":
      nombreSkill = "Navegacion";
      break;
    case "SkillPtsLibresB":
      nombreSkill = "Skills libres";
      break;
  }
  return nombreSkill;
}

export { transcribirSkill };
