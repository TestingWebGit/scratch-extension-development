const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3YourExtension {
    constructor(runtime) {
        this.runtime = runtime;

        // Mantenemos el estado de movimiento de los sprites
        this.movingSprites = new Map();

        // Añadimos un único listener al evento TICK
        this.runtime.addListener('TICK', this.updateSprites.bind(this));
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
            blocks: [
                {
                    opcode: 'controlMovement',
                    blockType: BlockType.COMMAND,
                    text: 'Mover [OBJECT] continuamente',
                    arguments: {
                        OBJECT: {
                            type: ArgumentType.STRING,
                            defaultValue: '_me_'
                        }
                    },
                    filter: [TargetType.SPRITE]
                },
                {
                    opcode: 'stopMovement',
                    blockType: BlockType.COMMAND,
                    text: 'Detener movimiento de [OBJECT]',
                    arguments: {
                        OBJECT: {
                            type: ArgumentType.STRING,
                            defaultValue: '_me_'
                        }
                    },
                    filter: [TargetType.SPRITE]
                }
            ]
        };
    }

    /**
     * Añade un sprite al mapa de sprites en movimiento.
     */
    controlMovement(args, util) {
        let target;

        if (args.OBJECT === '_me_') {
            target = util.target; // Sprite actual
        } else {
            target = this.runtime.targets.find(t => t.getName() === args.OBJECT && t.isSprite());
        }

        if (!target) {
            console.warn(`El objeto '${args.OBJECT}' no existe o no es un sprite.`);
            return;
        }

        // Añadir el sprite al mapa
        this.movingSprites.set(target.id, target);
    }

    /**
     * Detiene el movimiento de un sprite.
     */
    stopMovement(args, util) {
        let target;

        if (args.OBJECT === '_me_') {
            target = util.target; // Sprite actual
        } else {
            target = this.runtime.targets.find(t => t.getName() === args.OBJECT && t.isSprite());
        }

        if (!target) {
            console.warn(`El objeto '${args.OBJECT}' no existe o no es un sprite.`);
            return;
        }

        // Eliminar el sprite del mapa
        this.movingSprites.delete(target.id);
    }

    /**
     * Actualiza las posiciones de los sprites en movimiento.
     */
    updateSprites() {
        this.movingSprites.forEach((sprite) => {
            if (this.runtime.ioDevices.keyboard.getKey('a')) {
                sprite.setXY(sprite.x - 10, sprite.y); // Mueve a la izquierda
            }
            if (this.runtime.ioDevices.keyboard.getKey('d')) {
                sprite.setXY(sprite.x + 10, sprite.y); // Mueve a la derecha
            }
            if (this.runtime.ioDevices.keyboard.getKey('w')) {
                sprite.setXY(sprite.x, sprite.y + 10); // Mueve arriba
            }
            if (this.runtime.ioDevices.keyboard.getKey('s')) {
                sprite.setXY(sprite.x, sprite.y - 10); // Mueve abajo
            }
        });
    }
}

module.exports = Scratch3YourExtension;
