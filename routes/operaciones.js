//Listas de nombres y restriccioness
const altisonante = ['BACA', 'BAKA', 'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'CAKO', 'COGE', 'COGI', 'COJA', 'COJE', 'COJI', 'COJO', 'COLA', 'CULO', 'FALO', 'FETO', 'GETA', 'GUEI', 'GUEY', 'JETA', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KAKA', 'KAKO', 'KOGE', 'KOGI', 'KOJA', 'KOJE', 'KOJI', 'KOJO', 'KOLA', 'KULO', 'LILO', 'LOCA', 'LOCO', 'LOKA', 'LOKO', 'MAME', 'MAMO', 'MEAR', 'MEAS', 'MEON', 'MIAR', 'MION', 'MOCO', 'MOKO', 'MULA', 'MULO', 'NACA', 'NACO', 'PEDA', 'PEDO', 'PENE', 'PIPI', 'PITO', 'POPO', 'PUTA', 'PUTO', 'QULO', 'RATA', 'ROBA', 'ROBE', 'ROBO', 'RUIN', 'SENO', 'TETA', 'VACA', 'VAGA', 'VAGO', 'VAKA', 'VUEI', 'VUEY', 'WUEI', 'WUEY'];
const wordSpecial = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD', 'EL', 'LA', 'LOS', 'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y'];

function getRFC(data) {
    const name = data.nombres.toUpperCase().split(' ');
    const pApellido = data.ApellidoP.toUpperCase().split(' ');
    const mApellido = data.ApellidoM.toUpperCase();
    const fechaNacimiento = data.Fecha.replace(/-/g, '');
    const claveEntidad = data.claveEntidad;
    const sexo = data.sexo;
    // save final values 
    let nombre;
    let ApellidoP;
    let apellidoM;
    let fecha = fechaNacimiento.substring(2, fechaNacimiento.length);

    if (Array.isArray(name) && name.length > 1) {
        if (name[0].includes('MARIA') || name[0].includes('JOSE')) {
            nombre = name[1];
        } else {
            nombre = name[0];
        }
    } else {
        nombre = name[0];
    }

    let secondNombreConsonant = nombre.match(/^.(?:.*?([^AEIOU]))/i);
    secondNombreConsonant = secondNombreConsonant[1];


    if (Array.isArray(pApellido) && pApellido.length > 1) {
        if (wordSpecial.includes(pApellido[0])) {
            ApellidoP = pApellido[1];
        } else {
            ApellidoP = pApellido[0];
        }
    } else {
        ApellidoP = pApellido;
    }
    let ConsonantApellidoPaterno = ApellidoP;
    ApellidoP = ApellidoP[0].match(/^.*?([A-ZÑ])(?:.*?([AEIOU]))/i);

    let secondConsonant = ConsonantApellidoPaterno[0].match(/^.(?:.*?([^AEIOU]))/i);
    secondConsonant = secondConsonant[1];

    if (ApellidoP != null) {
        if (ApellidoP[1] === 'Ñ') {
            ApellidoP = 'X' + ApellidoP[2];
        } else {
            ApellidoP = ApellidoP[1] + ApellidoP[2];
        }
    } else {
        ApellidoP = pApellido[0].charAt(0) + 'X';
    }

    apellidoM = mApellido.match(/^.(?:.*?([^AEIOU]))/i);
    let MsecondConsonant;

    if (mApellido == '') {
        apellidoM = 'X';
        MsecondConsonant = 'X';
    } else {
        MsecondConsonant = apellidoM[1];
        apellidoM = mApellido.substring(0, 1);
    }


    let verifyName = ApellidoP + apellidoM + nombre.substring(0, 1);

    if (altisonante.includes(verifyName)) {
        verifyName = verifyName.substring(0, 1) + 'X' + verifyName.substring(2, 4);
    }

    let RFC = verifyName + fecha + sexo + claveEntidad + secondConsonant + MsecondConsonant + secondNombreConsonant;
    console.log(RFC)
    return RFC;
};

function EstadosCodigos(codigo) { // Se exporta junto con Calcular
    const estados = {
        'AS': 'AGUASCALIENTES',
        'BC': 'BAJA CALIFORNIA',
        'BS': 'BAJA CALIFORNIA SUR',
        'CC': 'CAMPECHE',
        'CL': 'COAHUILA',
        'CM': 'COLIMA',
        'CH': 'CHIAPAS',
        'DF': 'CIUDAD DE MEXICO',
        'DG': 'DURANGO',
        'GT': 'GUANAJUATO',
        'GR': 'GUERRERO',
        'HG': 'HIDALGO',
        'JC': 'JALISCO',
        'MC': 'ESTADO DE MEXICO',
        'MN': 'MICHOACAN',
        'MS': 'MORELOS',
        'NT': 'NAYARIT',
        'NL': 'NUEVO LEON',
        'OC': 'OAXACA',
        'PL': 'PUEBLA',
        'QT': 'QUERETARO',
        'QR': 'QUINTANO ROO',
        'SP': 'SAN LUIS POTOSI',
        'SL': 'SINALOA',
        'SR': 'SONORA',
        'TC': 'TABASCO',
        'TS': 'TAMAULIPAS',
        'TL': 'TLAXCALA',
        'VZ': 'VERACRUZ',
        'YN': 'YUCATAN',
        'ZS': 'ZACATECAS',
        'NE': 'NACIDO EN EL EXTRANJERO'
    }
    return estados[codigo];
}

// Importante para exportar funciones en NodeJS
module.exports = {
    'getRFC': getRFC,
    "GenerarEstado": EstadosCodigos
};