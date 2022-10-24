import 'setimmediate';
import axios from 'axios';
import cloudinary from 'cloudinary';

import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: 'dd7nnwntx',
    api_key: '889786519318144',
    api_secret: process.env.CLOUDINARY_API_SECRET
})

describe('Pruebas en el uploadImage', () => {
   
    it('debe de cargar un archivo y retornar el url', async (done) => {

        const { data } = await axios.get('https://res.cloudinary.com/dd7nnwntx/image/upload/v1663024763/jeniznw0vcksdwykwyoe.jpg', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'keyboard.jpg')
        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        // Tomar el ID
        const segments = url.split('/');
        const imgId = segments[segments.length - 1].replace('.jpg', '');
        cloudinary.v2.api.delete_resources(imgId,  {}, () => {
            done()
        })

    })

})