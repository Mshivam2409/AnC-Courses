import * as toxicity from '@tensorflow-models/toxicity';
import franc from "franc"

class TensorflowModel {
    classify = async (text: string): Promise<{ result: boolean, message: string }> => {

        const threshold = 0.9;
        const langugageScore = franc.all(text, { only: ['eng'] })[1][1]

        if (langugageScore < threshold)
            return { result: false, message: "Language is not English!" }

        // Which toxicity labels to return.
        const labelsToInclude = ['identity_attack', 'insult', 'threat'];

        const model = await toxicity.load(threshold, labelsToInclude)
        const predictions = await model.classify(text)

        for (let index = 0; index < predictions.length; index++) {
            if (predictions[index].results[0].match)
                return { result: false, message: `${predictions[index].label} detected!` }
        }

        return { result: true, message: "success" }
    }
}

const Tensorflow = new TensorflowModel()

export default Tensorflow
