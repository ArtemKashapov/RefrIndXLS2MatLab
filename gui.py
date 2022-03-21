# python -m eel gui.py web --onefile --noconsol --i "path\rind_logo.ico"
import eel
from transformer import Transformer
import os, time


@eel.expose
def process(file, outname):
    t = Transformer(file=bytes(file), outfuncname=outname)
    t.get_arrays()
    t.create_m_file()


@eel.expose
def destroy(filename):
    time.sleep(3)
    try:
        os.remove("web\\" + filename)
    except:
        pass

eel.init('web')
if __name__=="__main__":
    eel.start('index.html', port=8081, size=(984, 646), position=(640, 360))