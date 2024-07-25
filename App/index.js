// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Alert, TouchableOpacity, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

const { width, height } = Dimensions.get('screen');
const CELL_SIZE = 20;
const GRID_SIZE = 15;
const ENGINE = Matter.Engine.create();
const WORLD = ENGINE.world;

const Snake = (props) => {
    const { body, size, color } = props;

    return (
        <View style={[stylesSnake.head, { left: body.position.x - size / 2, top: body.position.y - size / 2, width: size, height: size, backgroundColor: color }]} />
    );
};

const stylesSnake = StyleSheet.create({
    head: {
        position: 'absolute',
    },
});

const Food = (props) => {
    const { position, size, color } = props;

    return (
        <View style={[stylesFood.food, { left: position.x * size, top: position.y * size, width: size, height: size, backgroundColor: color }]} />
    );
};

const stylesFood = StyleSheet.create({
    food: {
        position: 'absolute',
    },
});

export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const App = () => {
    const [running, setRunning] = useState(false);
    const [gameEngine, setGameEngine] = useState(null);
    const [entities, setEntities] = useState({});

    useEffect(() => {
        setEntities({
            head: Snake({ body: { position: { x: width / 2, y: height / 2 } }, size: CELL_SIZE, color: 'green' }),
            food: Food({ position: randomBetween(0, GRID_SIZE - 1), size: CELL_SIZE, color: 'red' }),
        });
        setRunning(true);
    }, []);

    const gameOver = () => {
        setRunning(false);
        Alert.alert('Game Over');
    };

    return (
        <SafeAreaView style={stylesApp.container}>
            <Text style={stylesApp.title}>Snake Game</Text>
            <GameEngine
                ref={(ref) => setGameEngine(ref)}
                style={stylesApp.gameContainer}
                systems={[]}
                entities={entities}
                running={running}
                onEvent={(e) => {
                    if (e.type === 'game-over') gameOver();
                }}
            />
            <View style={stylesApp.controller}>
                <TouchableOpacity style={stylesApp.controlButton} onPress={() => {
                    gameEngine.dispatch({ type: 'move-up' });
                }}>
                    <Text style={stylesApp.controlButtonText}>Up</Text>
                </TouchableOpacity>
                <View style={stylesApp.controllerRow}>
                    <TouchableOpacity style={stylesApp.controlButton} onPress={() => {
                        gameEngine.dispatch({ type: 'move-left' });
                    }}>
                        <Text style={stylesApp.controlButtonText}>Left</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesApp.controlButton} onPress={() => {
                        gameEngine.dispatch({ type: 'move-down' });
                    }}>
                        <Text style={stylesApp.controlButtonText}>Down</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesApp.controlButton} onPress={() => {
                        gameEngine.dispatch({ type: 'move-right' });
                    }}>
                        <Text style={stylesApp.controlButtonText}>Right</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const stylesApp = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 40,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    gameContainer: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    controller: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20,
    },
    controllerRow: {
        flexDirection: 'row',
        marginTop: 20,
    },
    controlButton: {
        backgroundColor: '#4CAF50',
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    controlButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default App;