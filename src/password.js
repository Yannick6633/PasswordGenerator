class Password {

  static lowers = 1;             // 00001
  static uppers = 2;             // 00010
  static numbers = 4;            // 00100
  static symbols = 8;            // 01000
  static brackets = 16;          // 10000
  
  static all = Password.lowers|
               Password.uppers|
               Password.numbers|
               Password.symbols|
               Password.brackets; // 11111 - 11110 Password.all & ~Password.lowers

  constructor() {
    this.data = [
      { name: 'Miniscule', range: Password.lowers, chars: 'abcdefghijklmnopqrstuvwxyz' },
      { name: 'Majuscule', range: Password.uppers, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      { name: 'Chiffres', range: Password.numbers, chars: '0123456789' },
      { name: 'Symboles', range: Password.symbols, chars: '?-*%!@#_$.:;/~=+' },
      { name: 'Crochets', range: Password.brackets, chars: '[]{}()<>' }
    ];

    // Le choix de la rangée de chars choisie par l'utilisateur.
    this.setRange(Password.all);
    
  }

  // Permet de filtrer les chars en fonction du choix de l'utilisateur.
  getChars() {
    let chars = '';

    this.data.forEach(objet => {
      if (objet.range & this.range) {
          chars += objet.chars;
      }
    });

    return chars;
  }

  generate(size = 16) {
    if (this.range === 0) {
        this.setRange(Password.all);
    }

    let str = '';
    const chars = this.getChars();

    for (let i = 0; i < size; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return str;
  }

  setRange(value) {
    // initialisation du range
    this.range = value;
  }

  exclude(value) {
    // exclude du range
    this.range &= ~value;
  }

  include(value) {
    // include du range
    this.range |= value;
  }

}

  