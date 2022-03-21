from transformer import Transformer


if __name__=="__main__":
    filename = 'Al.xls'
    outname = 'n_Al' # and also matlab func name
    t = Transformer(filename=filename, outfuncname=outname)
    t.get_arrays()
    t.create_m_file()