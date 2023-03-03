#!/bin/bash
set -e

echo "Verifying location of Scratch source is known"
if [ -z "$SCRATCH_SRC_HOME" ]; then
    echo "Error: SCRATCH_SRC_HOME environment variable is not set."
    exit 1
fi

echo "Checking if Scratch source has already been customized"
if [ -e $SCRATCH_SRC_HOME/patched ]; then
    exit 1
fi

echo "Getting the location of this script"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $DIR

echo "Adding extension to Scratch source"
cd $SCRATCH_SRC_HOME/scratch-vm/src/extensions
ln -s $DIR/your-scratch-extension your-scratch-extension

echo "Patching Scratch source to enable extension"
# patch -d $SCRATCH_SRC_HOME/scratch-vm < $DIR/scratch-vm.patch
# patch -d $SCRATCH_SRC_HOME/scratch-gui < $DIR/scratch-gui.patch
cd $SCRATCH_SRC_HOME/scratch-vm
git apply $DIR/patches/scratch-vm.patch
cd $SCRATCH_SRC_HOME/scratch-gui
git apply $DIR/patches/scratch-gui.patch

echo "Marking the Scratch source as customized"
touch $SCRATCH_SRC_HOME/patched