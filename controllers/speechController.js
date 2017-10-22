
// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');
const language = require('@google-cloud/language');

const fs = require('fs');
const client = new language.LanguageServiceClient();

// Your Google Cloud Platform project ID
const projectId = 'hackathon-batch4';

// Instantiates a client
const speechClient = Speech({
    projectId: projectId
});

// The name of the audio file to transcribe


module.exports = {
    getText: (req, res, next) => {
        console.log('AUDIO URI', req.body);
        const fileName = req.body;
        // Reads a local audio file and converts it to base64
        const file = fs.readFileSync(fileName);
        const audioBytes = file.toString('base64');

        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        const audio = {
            content: audioBytes
        };
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US'
        };
        const request = {
            audio: audio,
            config: config
        };
        let text = '';

        // Detects speech in the audio file
        speechClient.recognize(request)
            .then((data) => {
                const response = data[0];
                const transcription = response.results.map(result =>
                    result.alternatives[0].transcript).join('\n');
                console.log(`Transcription: ${transcription}`);
                return text = transcription;
            })
            .then((text) => {
                const document = {
                    content: text,
                    type: 'PLAIN_TEXT',
                };
                // Detects the sentiment of the text
                client
                    .analyzeSentiment({ document: document })
                    .then(results => {
                        const sentiment = results[0].documentSentiment;
                        res.send({ sentiment, text })
                        // console.log(results)
                        console.log(`Text: ${text}`);
                        console.log(`Sentiment score: ${sentiment.score}`);
                        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
                    })
                    .catch(err => {
                        console.error('ERROR:', err);
                    });
            })
            .catch((err) => {
                console.error('SERVER ERROR:', err);
            });
    },
};
