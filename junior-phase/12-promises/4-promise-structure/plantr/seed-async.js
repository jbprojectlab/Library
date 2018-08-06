const db = require('./models')

const {
    vegetable: Vegetable,
    gardener: Gardener,
    plot: Plot,
    vegetable_plot: VegetablePlot,
} = db.models

const seed = async () => {
    try {
        await db.sync({ force: true })
        const vegetableData = [
            {
                name: 'Carrot',
                color: 'orange',
            },
            {
                name: 'Tomato',
                color: 'red',
            },
            {
                name: 'Pepper',
                color: 'green',
            },
        ]
        const [carrot, tomato, pepper] = await Vegetable.bulkCreate(
            vegetableData,
            {
                returning: true,
            }
        )
        const gardenerData = [
            {
                name: 'McGregor',
                age: 60,
                favoriteVegetableId: carrot.id,
            },
            {
                name: 'Hashimoto',
                age: 37,
                favoriteVegetableId: pepper.id,
            },
            {
                name: 'Giancarlo',
                age: 19,
                favoriteVegetableId: tomato.id,
            },
        ]
        const [mcgregor, hashimoto, giancarlo] = await Gardener.bulkCreate(
            gardenerData,
            {
                returning: true,
            }
        )
        const plotData = [
            {
                size: 20,
                shaded: false,
                gardenerId: mcgregor.id,
            },
            {
                size: 40,
                shaded: true,
                gardenerId: hashimoto.id,
            },
            {
                size: 10,
                shaded: false,
                gardenerId: giancarlo.id,
            },
        ]
        const [
            mcgregorPlot,
            hashimotoPlot,
            giancarloPlot,
        ] = await Plot.bulkCreate(plotData, { returning: true })
        const vegetablePlotData = [
            {
                vegetableId: carrot.id,
                plotId: mcgregorPlot.id,
            },
            {
                vegetableId: pepper.id,
                plotId: mcgregorPlot.id,
            },
            {
                vegetableId: carrot.id,
                plotId: hashimotoPlot.id,
            },
            {
                vegetableId: pepper.id,
                plotId: hashimotoPlot.id,
            },
            {
                vegetableId: tomato.id,
                plotId: hashimotoPlot.id,
            },
            {
                vegetableId: tomato.id,
                plotId: giancarloPlot.id,
            },
            {
                vegetableId: pepper.id,
                plotId: giancarloPlot.id,
            },
        ]
        await VegetablePlot.bulkCreate(vegetablePlotData)
        console.log('Database synced!')
    } catch (err) {
        console.log('Disaster! Something went wrong! ')
        console.log(err)
    } finally {
        db.close()
    }
}

seed()
