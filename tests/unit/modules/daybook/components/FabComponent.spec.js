import { shallowMount } from "@vue/test-utils"
import FabComponent from '@/modules/daybook/components/FabComponent'

describe('Pruebas en el FAB component', () => {
    

    it('debe de mostrar el ícono por defect', () => {
        let wrapper = shallowMount(FabComponent)
        let $iTag = wrapper.find('i')
        expect($iTag.classes('fa-plus')).toBeTruthy()
    })

    it('debe de mostrar el ícono por argument', () => {
        let iconName = 'fa-circle'
        let wrapper = shallowMount(FabComponent, {
            props: {
                iconName
            }
        })
        let $icon = wrapper.find('i')
        expect($icon.classes(iconName)).toBeTruthy()
    })

    it('debe de emitir el evento on:click cuando se hace click', () => {
        let wrapper = shallowMount(FabComponent)
        let $btn = wrapper.find('button')

        $btn.trigger('click')
        // console.log(wrapper.emitted('on:click'))
        expect(wrapper.emitted('on:click').length).toBe(1)
    })

})