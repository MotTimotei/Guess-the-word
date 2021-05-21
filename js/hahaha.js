import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import {lockAsync} from "expo-screen-orientation";

export default class App extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Video onLoad={changeScreenOrientation}
                    source={{ uri: 'https://58f9d53e45ea8.streamlock.net:443/wildliferomania2/live.stream_aac/manifest.mpd' }}
                    shouldPlay
                    useNativeControls
                    style={styles.video} 
                    controls={true} 
                    resizeMode={'cover'}
                />
            </View>
        );
    }
}

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16),
        backgroundColor: 'black',
    }
});

// https://58f9d53e45ea8.streamlock.net:443/wildliferomania2/live.stream_aac
// https://58f9d53e45ea8.streamlock.net:443/wildliferomania2/live.stream_aac/manifest.mpd
/**
 * infoo.tv
 * inspect element
 * ceva cu "smil"
 * https://58ffa4254ef21.streamlock.net:443/harul/smil:harul.smil/playlist.m3u8
 */