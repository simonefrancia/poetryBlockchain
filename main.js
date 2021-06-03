const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previous_hash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previous_hash = previous_hash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index+ this.previous_hash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2020", {'ROOT' : 'ROOT'}, "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previous_hash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previous_hash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }

}


let poetryChain = new Blockchain();

poetryChain.addBlock(new Block(1, "08/03/2020", {'author' : 'Giovanni Pascoli', 'name' : 'Sogno', 'work' : "Per un attimo fui nel mio villaggio,\nnella mia casa. Nulla era mutato\nStanco tornavo, come da un vïaggio;\nstanco, al mio padre, ai morti, ero tornato.\n\nSentivo una gran gioia, una gran pena;\nuna dolcezza ed un’angoscia muta.\n– Mamma?-È là che ti scalda un po’ di cena-\nPovera mamma! e lei, non l’ho veduta."}))
poetryChain.addBlock(new Block(2, "09/03/2020", {'author' : 'Giacomo Leopardi', 'name' : 'Il Sabato del Villaggio' , 'work' : "La donzelletta vien dalla campagna,\nIn sul calar del sole,\nCol suo fascio dell'erba; e reca in mano\nUn mazzolin di rose e di viole,\nOnde, siccome suole,\nOrnare ella si appresta\nDimani, al dì di festa, il petto e il crine.\nSiede con le vicine\nSu la scala a filar la vecchierella,\nIncontro là dove si perde il giorno;\nE novellando vien del suo buon tempo,\nQuando ai dì della festa ella si ornava,\nEd ancor sana e snella\nSolea danzar la sera intra di quei\nCh'ebbe compagni dell'età più bella\nGià tutta l'aria imbruna,\nTorna azzurro il sereno, e tornan l'ombre\nGiù da' colli e da' tetti,\nAl biancheggiar della recente luna.\nOr la squilla dà segno\nDella festa che viene;\nEd a quel suon diresti\nChe il cor si riconforta.\nI fanciulli gridando\nSu la piazzuola in frotta,\nE qua e là saltando,\nFanno un lieto romore:\nE intanto riede alla sua parca mensa,\nFischiando, il zappatore,\nE seco pensa al dì del suo riposo\nPoi quando intorno è spenta ogni altra face,\nE tutto l'altro tace,\nOdi il martel picchiare, odi la sega\nDel legnaiuol, che veglia\nNella chiusa bottega alla lucerna,\nE s'affretta, e s'adopra\nDi fornir l'opra anzi il chiarir dell'alba.\nQuesto di sette è il più gradito giorno,\nPien di speme e di gioia:\nDiman tristezza e noia\nRecheran l'ore, ed al travaglio usato\nCiascuno in suo pensier farà ritorno.\nGarzoncello scherzoso,\nCotesta età fiorita\nÈ come un giorno d'allegrezza pieno,\nGiorno chiaro, sereno,\nChe precorre alla festa di tua vita.\nGodi, fanciullo mio; stato soave,\nStagion lieta è cotesta.\nAltro dirti non vo'; ma la tua festa\nCh'anco tardi a venir non ti sia grave."}))
poetryChain.addBlock(new Block(3, "10/03/2020", {'author' : 'Giacomo Leopardi', 'name' : 'L’infinito' , 'work' : "Sempre caro mi fu quest’ermo colle,\nE questa siepe, che da tanta parte\nDell’ultimo orizzonte il guardo esclude.\nMa sedendo e mirando, interminati\nSpazi di là da quella, e sovrumani\nSilenzi, e profondissima quiete\nIo nel pensier mi fingo; ove per poco\nIl cor non si spaura. E come il vento\nOdo stormir tra queste piante, io quello\nInfinito silenzio a questa voce\nVo comparando: e mi sovvien l’eterno,\nE le morte stagioni, e la presente\nE viva, e il suon di lei. Così tra questa\nImmensità s’annega il pensier mio:\nE il naufragar m’è dolce in questo mare."}))

console.log(JSON.stringify(poetryChain, null, 4));

console.log("Is poetryChain valid? " + poetryChain.isChainValid());

poetryChain.chain[1].data.author='Eugenio Montale';

console.log("Is poetryChain valid? " + poetryChain.isChainValid());

poetryChain.chain[1].hash=poetryChain.chain[1].calculateHash() ;

console.log("Is poetryChain valid? " + poetryChain.isChainValid());
