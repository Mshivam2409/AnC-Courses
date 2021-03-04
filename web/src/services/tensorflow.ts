import * as toxicity from '@tensorflow-models/toxicity';
import franc from "franc"

class TensorflowModel {
    classify = async (text: string): Promise<{ result: boolean, message: string }> => {

        const threshold = 0.9;
        const langugageScore = franc.all(text, { only: ['eng'] })
        if (langugageScore[0][0] !== "eng")
            return { result: false, message: "Language is not English!" }

        if (langugageScore[0][1] < threshold)
            return { result: false, message: "Language is not English!" }

        // Which toxicity labels to return.
        const labelsToInclude = ['identity_attack', 'insult', 'threat'];
        try {
            const model = await toxicity.load(threshold, labelsToInclude)
            const predictions = await model.classify(text)

            for (let index = 0; index < predictions.length; index++) {
                if (predictions[index].results[0].match)
                    return { result: false, message: `${predictions[index].label} detected!` }
            }
        } catch (reason) {
            return { result: false, message: reason }
        }
        return { result: true, message: "success" }
    }
}

const Tensorflow = new TensorflowModel()

export default Tensorflow
