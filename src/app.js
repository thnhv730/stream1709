import { Peer } from 'https://cdn.jsdelivr.net/npm/peerjs@1.4.7/+esm';
import { uid } from 'https://cdn.jsdelivr.net/npm/uid@2.0.2/+esm';
import { openStream } from './openStream.js';
import { playVideo } from './playVideo.js';

const config = { host: 'localhost', port: 443, secure: true, key: 'peerjs' };

function getPeer() {
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}

const peer = new Peer(getPeer());

$('#btnCall').click(() => {
    const friendId = $('#txtFriendId').val();
    openStream(stream => {
        playVideo(stream, 'localStream');
        const call = peer.call(friendId, stream);
        call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
    });
});

peer.on('call', call => {
    openStream(stream => {
        playVideo(stream, 'localStream');
        call.answer(stream);
        call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
    });
});