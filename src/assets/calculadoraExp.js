function calcularExp(level, exp) {
  let porcentaje;

  switch (level) {
    case 1:
      porcentaje = ((exp * 100) / 300).toFixed(0);
      break;
    case 2:
      porcentaje = ((exp * 100) / 450).toFixed(0);
      break;
    case 3:
      porcentaje = ((exp * 100) / 675).toFixed(0);
      break;
    case 4:
      porcentaje = ((exp * 100) / 1012).toFixed(0);
      break;
    case 5:
      porcentaje = ((exp * 100) / 1518).toFixed(0);
      break;
    case 6:
      porcentaje = ((exp * 100) / 2277).toFixed(0);
      break;
    case 7:
      porcentaje = ((exp * 100) / 3416).toFixed(0);
      break;
    case 8:
      porcentaje = ((exp * 100) / 5124).toFixed(0);
      break;
    case 9:
      porcentaje = ((exp * 100) / 7886).toFixed(0);
      break;
    case 10:
      porcentaje = ((exp * 100) / 11529).toFixed(0);
      break;
    case 11:
      porcentaje = ((exp * 100) / 14988).toFixed(0);
      break;
    case 12:
      porcentaje = ((exp * 100) / 19484).toFixed(0);
      break;
    case 13:
      porcentaje = ((exp * 100) / 25329).toFixed(0);
      break;
    case 14:
      porcentaje = ((exp * 100) / 32928).toFixed(0);
      break;
    case 15:
      porcentaje = ((exp * 100) / 42806).toFixed(0);
      break;
    case 16:
      porcentaje = ((exp * 100) / 55648).toFixed(0);
      break;
    case 17:
      porcentaje = ((exp * 100) / 72342).toFixed(0);
      break;
    case 18:
      porcentaje = ((exp * 100) / 94045).toFixed(0);
      break;
    case 19:
      porcentaje = ((exp * 100) / 122259).toFixed(0);
      break;
    case 20:
      porcentaje = ((exp * 100) / 158937).toFixed(0);
      break;
    case 21:
      porcentaje = ((exp * 100) / 206618).toFixed(0);
      break;
    case 22:
      porcentaje = ((exp * 100) / 268603).toFixed(0);
      break;
    case 23:
      porcentaje = ((exp * 100) / 349184).toFixed(0);
      break;
    case 24:
      porcentaje = ((exp * 100) / 453939).toFixed(0);
      break;
    case 25:
      porcentaje = ((exp * 100) / 544727).toFixed(0);
      break;
    case 26:
      porcentaje = ((exp * 100) / 663672).toFixed(0);
      break;
    case 27:
      porcentaje = ((exp * 100) / 784406).toFixed(0);
      break;
    case 28:
      porcentaje = ((exp * 100) / 941287).toFixed(0);
      break;
    case 29:
      porcentaje = ((exp * 100) / 1129544).toFixed(0);
      break;
    case 30:
      porcentaje = ((exp * 100) / 1355453).toFixed(0);
      break;
    case 31:
      porcentaje = ((exp * 100) / 1626544).toFixed(0);
      break;
    case 32:
      porcentaje = ((exp * 100) / 1951853).toFixed(0);
      break;
    case 33:
      porcentaje = ((exp * 100) / 2342224).toFixed(0);
      break;
    case 34:
      porcentaje = ((exp * 100) / 3372803).toFixed(0);
      break;
    case 35:
      porcentaje = ((exp * 100) / 4047364).toFixed(0);
      break;
    case 36:
      porcentaje = ((exp * 100) / 5828204).toFixed(0);
      break;
    case 37:
      porcentaje = ((exp * 100) / 6993845).toFixed(0);
      break;
    case 38:
      porcentaje = ((exp * 100) / 8392614).toFixed(0);
      break;
    case 39:
      porcentaje = ((exp * 100) / 10071137).toFixed(0);
      break;
    case 40:
      porcentaje = ((exp * 100) / 120853640).toFixed(0);
      break;
    case 41:
      porcentaje = ((exp * 100) / 145024370).toFixed(0);
      break;
    case 42:
      porcentaje = ((exp * 100) / 174029240).toFixed(0);
      break;
    case 43:
      porcentaje = ((exp * 100) / 208835090).toFixed(0);
      break;
    case 44:
      porcentaje = ((exp * 100) / 417670180).toFixed(0);
      break;
    case 45:
      porcentaje = ((exp * 100) / 835340360).toFixed(0);
      break;
    case 46:
      porcentaje = ((exp * 100) / 1670680720).toFixed(0);
      break;
  }

  return porcentaje;
}

export { calcularExp };
