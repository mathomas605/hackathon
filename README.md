Band.js - Music Composer
An interface for the Web Audio API that supports rhythms, multiple instruments, repeating sections, and complex time signatures.
Gitter

Get Started
Include band.min.js in the head of your document.

Create an new instance: var conductor = new BandJS();

Give it a Time Signature: conductor.setTimeSignature(4,4);

Set the tempo: conductor.setTempo(120);

Create an instrument: var piano = conductor.createInstrument();

Start adding notes:

piano.note('quarter', 'C4');
piano.note('quarter', 'D4');
piano.note('quarter', 'E4');
piano.note('quarter', 'F4');
Tell the conductor everything is done: var player = conductor.finish();. It will return you the player instance to use for playing, pausing, muting, stopping, and seeking.

Start playing the music: player.play()

Examples
Super Mario Bros Theme - Created by me
Tetris Theme - Created by rooktakesqueen
Zelda Main Theme - Created by legosjedi
Frog's Theme - Chrono Trigger - Created by Me & Jarred Mack
In The News
Retro Game Music using Web Audio API and Band.js
API
Conductor Class
Method Params Description
constructor(tuning, rhythm) tuning: 'equalTemperament'
rhythm: 'northAmerican' When creating a new BandJS() object, you can pass in the type of tuning and rhythm notation you want to use. By default Band.js uses Equal Temperament as it's default tuning and North American (whole, half, quarter, etc) as it's default rhythm notation.
setTimeSignature(top, bottom) top: 4
bottom: 4 This will set the Time Signature for the music. Any number of top numbers (how many beats per bar) can be set, but the bottom number (which note gets the beat) can only be 2, 4, or 8.
setTempo(tempo) tempo: 120 Set the tempo (BPM) of the music. If a player has been instantiated, then the onDurationChangeCallback will be called.
setMasterVolume(volume) volume: 100 Set the master volume of the music. From 0 to 100
getTotalSeconds() n/a Returns the total number of seconds a song is.
setNoteBufferLength(bufferLength) bufferLength: 20 Set the number of notes that are buffered every (tempo / 60 \* 5) seconds. **WARNING** The higher this is, the more memory is used and can crash your browser. If notes are being dropped, you can increase this, but be weary of used memory.
finish() n/a Totals up the duration of the song and returns the Player Class.
setOnFinishedCallback(callback) callback: Func Pass in a function that will be called when the music has completed
setTickerCallback(callback) callback: Func Pass in a function that will be called every second the music is playing. It will pass the current number of seconds that have passed.
setOnDurationChangeCallback(callback) callback: Func Pass in a function that will be called when the duration of a song has changed. Most likely it's because you have changed the tempo of a song.
createInstrument(name, pack) name: 'sine'
pack: 'oscillators' Creates an instrument that you can add notes/rests with. The first argument is the name of the instrument and the second is which pack it should use for that instrument name. By default BandJS uses the 'oscillators' instrument pack if one is not specified.
load(json) json: JSON Load a song into Band.js using JSON. Returns the Player Class. Format is: (**This will erase your current song and overwrite it with this new one**)
{
timeSignature: [4, 4],
tempo: 100,
instruments: {
rightHand: {
name: 'square',
pack: 'oscillators'
},
leftHand: {
name: 'sawtooth',
pack: 'oscillators'
}
},
notes: {
// Shorthand notation
rightHand: [
'quarter|E5, F#4|tie',
'quarter|rest',
'quarter|E5, F#4',
'quarter|rest'
],
// More verbose notation
leftHand: [
{
type: 'note',
pitch: 'D3',
rhythm: 'quarter'
}
]
}
}
Conductor Class Static Methods
Method Params Description
loadPack(type, name, data) type - instrument, rhythm, or tuning
name - name you want to give the pack
data - data is used differently depending on the type of pack being loaded, see description for more info on each type. Use this method to load in different packs which can be utilised while composing music. For rhythms, it needs to be an object of rhythm name as the key and duration as the value (i.e. {whole: 1, half: 0.5}).
For tuning, it needs to be an object of pitch name as the key and frequency as the value (i.e. {'A4': 440.00, 'A#4': 466.16})
And lastly, the instrument pack type. This needs to be a function which takes 2 arguments, name and audioContext, that returns an object with at least one method called createNote(destination, frequency). When an instrument is created using BandJS.createInstrument(name, pack) the library will use those two parameters to search the instrument packs and get a specific instrument. Once found, it will call it's function and pass in the name of the sound and the Audio Context. When the library wants the instrument to create a note, it will call the createNote(destination,
frequency) method and pass in the destination where the AudioNode you create should connect to. It will also pass in the frequency if you need it to create the note. Once the node is created, it needs to be returned and the library will run it's methods start() and stop() to play the sound at the correct time. To see a simple example, check out /src/instrument-packs/oscillators
.js. For a more complex example, check out /src/instrument-packs/noises.js
Player Class - Returned from the Conductor Class when calling Conductor.finish()
Method Params Description
play() n/a Play the music.
pause() n/a Pause the music.
stop(fadeOut) fadeOut: true Stop the music with a slight fade out. If you don't want the fade, pass in false.
mute(callback) n/a Mutes the music. You can pass in a function as a callback when the music completely faded.
unmute(callback) n/a Unmute the music. You can pass in a function as a callback when the music is completely faded up.
loop(loop) loop: false Pass in true if you want the music to keep looping forever.
setTime(seconds) seconds: 0 You can set the specific time a song should start playing at. This is handy for seeking time.
Instrument Class - Created by using the Conductor.createInstrument() method.
Method Params Description
note(rhythm, pitch, tie) rhythm Must be set
pitch optional
tie: false Adds a note to the stack of notes for the particular instrument.
If using North American notation, rhythm can be any from the list below
whole
dottedHalf
half
dottedQuarter
tripletHalf
quarter
dottedEighth
tripletQuarter
eighth
dottedSixteenth
tripletEighth
sixteenth
tripletSixteenth
thirtySecond
pitch is optional and can be any note between C0 and C8 (e.x. Bb3 or G#7)
tie can tie two notes together without any gap. By default the library puts in an articulation gap of about a tenth of the length of the note.
rest(rhythm) rhythm Must be set Adds a rest to the list of notes. Use the rhythm list above for the type of rest you can use.
setVolume(volume) volume: 25 Sets the volume for this particular instrument. From 0 to 100. You can call this multiple times before notes to change their volume at that point of the music.
repeatStart() n/a Puts in a marker where a section of music should be repeated from.
repeat(times) times: 1 Used in conjunction with repeatStart(). Pass in how many times the section should be repeated. If no repeatStart() is set, it goes from the beginning.
