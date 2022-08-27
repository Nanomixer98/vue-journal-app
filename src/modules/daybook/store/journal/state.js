export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, voluptatum consequuntur. Perferendis blanditiis praesentium perspiciatis.',
            picture: null
        },
        {
            id: new Date().getTime() + 100,
            date: new Date().toDateString(),
            text: 'Mollit id aute aute dolore commodo elit sint sit.',
            picture: null
        },
        {
            id: new Date().getTime() + 200,
            date: new Date().toDateString(),
            text: 'Incididunt elit aute officia adipisicing cupidatat enim amet cillum mollit anim ullamco veniam labore.',
            picture: null
        },
    ]
})