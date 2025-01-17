const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3YourExtension {

    constructor(runtime) {
        this.runtime = runtime; // Guarda el runtime para manejar eventos
    }

    /**
     * Retorna la metadata de la extensión.
     */
    getInfo() {
        return {
            id: 'MetaXSV',
            name: 'less coding',
            color1: '#000099',
            color2: '#660066',
            blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
            menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
            blocks: [
                {
                    opcode: 'controlMovement',
                    blockType: BlockType.COMMAND,
                    text: 'Controlar movimiento',
                    terminal: false,
                    filter: [TargetType.SPRITE]
                }
            ]
        };
    }

    /**
     * Implementación del bloque que controla el movimiento.
     */
    controlMovement() {
        // Referencia al objeto sprite activo
        const sprite = this.runtime.getEditingTarget();
        if (!sprite) return;

        // Lógica para mover el sprite
        this.runtime.addListener('TICK', () => {
            if (this.runtime.ioDevices.keyboard.getKey('a')) {
                sprite.x -= 10; // Mueve a la izquierda
            }
            if (this.runtime.ioDevices.keyboard.getKey('d')) {
                sprite.x += 10; // Mueve a la derecha
            }
        });
    }
}

module.exports = Scratch3YourExtension;
