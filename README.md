# transcription-buddy

An editor for Amazon Transcribe transcripts.

Amazon Transcribe is a very cheap way to automate transcription of audio files. While the output is fairly accurate, the service can make mistakes. Amazon usefully provide an output json file which provides confidence levels for every word, but does not provide a service to visualise this information. 

Transcription Buddy takes in Amazon Transcribe's output files, and visualises them in a browser-based editor. Low confidence words are highlighted to make the transcription process more efficient. Audio files can be loaded and controlled through the interface to help correct mistakes present.

## Getting started

These instructions will guide you through using the Amazon Transcribe service and get a copy of the project up and running on your local machine.

### Prerequisites

1. Have an [Amazon Web Servives](https://aws.amazon.com/) account 
2. Have [S3](https://aws.amazon.com/s3/) and [Transcribe](https://aws.amazon.com/transcribe/) set up on your AWS account

### Transcribing with AWS

#### Uploading audio to S3
1. Create a bucket for your audio in S3
2. Upload the audio file
3. Set the permissions for the file to 'public access' (read object)
4. Copy the url link to the file (found in the 'Overview' tab for the file)

#### Using Amazon Transcribe
* note you may have to set your region to US East (Ohio)) for this stage to work *
* before starting you can also create a 'custom volcabulary' if there are words used in your audio that AWS is likely to misinterpret (e.g. it often hears 'jesus' instead of 'GIS') *
1. Navigate to the 'Transcription jobs' page
2. Create new job
3. Fill out form with name, audio url (from the S3 file), adding custom volcabulary, set speaker identification to 'Enabled', and data source to 'Amazon defalut bucket'
4. Once the job is finished download the transcription (which shold be json file)

#### Installing the 
Clone the repository:
'''
git clone https://gitlab.com/samfredlumley/transcription-buddy
'''

## Extras

### Audio recording

### Audio preprocessing
