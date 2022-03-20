# python -m eel gui.py web --onefile --noconsol --i "path\rind_logo.ico"
import eel


eel.init('web')
if __name__=="__main__":
    eel.start('index.html', port=8081, size=(984, 646))