# Geiger Counter App — Setup Guide

The NHI Geiger Counter PWA is a browser-based audio pulse counter for Geiger-Müller detectors.

## Quick Start

1. Open [app.northharbourinstruments.com/geiger/](https://app.northharbourinstruments.com/geiger/) on your phone or laptop
2. Tap **Start Listening** and allow microphone access
3. Place your device near the Geiger counter speaker
4. Adjust **Sensitivity** until pulses are detected reliably

## Installing on Your Phone

### iPhone / iPad
1. Open the app URL in **Safari**
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. The app now works offline like a native app

### Android
1. Open the app URL in **Chrome**
2. Tap the **Install** banner, or Menu → **Add to Home Screen**
3. The app now works offline like a native app

## Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Sensitivity** | Detection threshold — higher = more sensitive | 50% |
| **Center Freq** | Target beep frequency in kHz | 4.266 kHz |
| **Bandpass Width** | Width of the frequency filter in Hz | 400 Hz |

## Troubleshooting

!!! warning "Not detecting pulses?"
    - Increase **Sensitivity** to 70–80%
    - Make sure the microphone is within ~30cm of the speaker
    - Check that the **Center Freq** matches your detector's beep frequency
    - On iPhone, ensure Safari has microphone permission: **Settings → Safari → Microphone → Allow**

!!! warning "Too many false counts?"
    - Decrease **Sensitivity**
    - Narrow the **Bandpass Width** to filter out background noise
    - Move away from other sound sources

## How It Works

The app uses a bandpass filter centered on your detector's beep frequency (default 4.266 kHz), amplifies the filtered signal, then runs an envelope follower at the full sample rate (~48,000 times per second) to detect individual pulses via rising-edge detection.
