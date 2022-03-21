import matplotlib.pyplot as plt


class Transformer():
    def __init__(self, file, outfuncname) -> None:
        self.file = file
        self.outfuncname = outfuncname
    
    def get_arrays(self):
        # with open(self.file, 'rb') as file:
        #     data = file.readlines()[0]
        data = str(self.file)
        data_ls = data.split('<tr>')
        data_ls

        siz = len(data_ls)
        wls = list()
        reals = list()
        imags = list()
        for ind in range(2, siz):
            current_line = data_ls[ind].replace('</td>', '').replace('</tr>', '').replace(',', '.').replace('</tbody></table></body></html>', '').replace("'", '').split('<td class="number">')
            wls.append(float(current_line[1]))
            reals.append(float(current_line[2]))
            imags.append(float(current_line[3]))

        plt.figure(figsize=(6, 3))
        plt.plot(wls, reals, label='n', lw=3)
        plt.plot(wls, imags, label='k', lw=3)

        plt.xlabel('\\lambda')
        plt.ylabel('refr ind')

        plt.xlim([wls[0], wls[-1]])
        plt.grid()
        plt.legend()
        plt.show()
        self.wls, self.reals, self.imags = wls, reals, imags
        # return wls, reals, imags

    def create_m_file(self):
        with open('web\\' + self.outfuncname + '.m', 'w') as f:
            f.writelines('function n = ' + self.outfuncname + '(wl0)' +'\n')
            f.writelines('wls = ' + str(self.wls) + ';\n')
            f.writelines('real_n = ' + str(self.reals) + ';\n')
            f.writelines('imag_k = ' + str(self.imags) + ';\n')
            f.writelines('n = spline(wls, real_n, wl0) + 1i*spline(wls, imag_k, wl0);\n')
            f.writelines('end\n')