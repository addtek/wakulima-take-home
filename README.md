# Wakulima
## Environment setup

### Android setup

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio.
It is recommended installing Node and Watchman using [Homebrew](https://brew.sh/). Run the following commands in a Terminal after installing Homebrew:
```
brew install node
brew install watchman
```
If you have already installed Node on your system, make sure it is Node 10 or newer.

#### Java development kit

JDK is also recommended to be installed via [Homebrew](https://brew.sh/). Run the following command in a Terminal:
```
brew install --cask adoptopenjdk/openjdk/adoptopenjdk8
```
If you have already installed JDK on your system, make sure it is JDK 8 or newer.

#### Android development evironment

[Download and install Android studio](https://developer.android.com/studio/index.html). While on Android Studio intallation wizard, make sure the boxes next to all of the following items are checked:
- Android SDK
- Android SDK Platform
- Android Virtual Device
- If you are not already using Hyper-V: Performance (Intel ® HAXM)
  Then, click "Next" to install all of these components. Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

Building a React Native app with native code, however, requires the *Android 10 (Q) SDK* in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.
To do that, open Android Studio, click on "Configure" button and select "SDK Manager".

![alt text](https://user-images.githubusercontent.com/40332350/98896851-68c69700-24c3-11eb-9017-408558936f53.png)

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under **Appearance & Behavior → System Settings → Android SDK**.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the **Android 10 (Q)** entry, then make sure the following items are checked:
- Android SDK Platform 29
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

![alt text](https://user-images.githubusercontent.com/49749955/98922391-712eca00-24e3-11eb-961c-c58efefee600.png)
![alt text](https://user-images.githubusercontent.com/49749955/98922375-6c6a1600-24e3-11eb-805a-1cda90bdc1e4.png)

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that **29.0.2** is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your **~/.bash_profile** or **~/.bashrc** (if you are using zsh then **~/.zprofile** or **~/.zshrc**) config file:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Type source **$HOME/.bash_profile** for bash or source **$HOME/.zprofile** to load the config into your current shell. Verify that ANDROID_HOME has been set by running **echo $ANDROID_HOME** and the appropriate directories have been added to your path by running **echo $PATH**.

> Make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under **Appearance & Behavior → System Settings → Android SDK**.

#### React Native Command Line Interface
React Native has a built-in command line interface. Rather than install and manage a specific version of the CLI globally, it is recommended for you to access the current version at runtime using **npx**, which ships with Node.js. With **npx react-native <command>**, the current stable version of the CLI will be downloaded and executed at the time the command is run.

#### Preparing the Android device

If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the instructions [here](https://reactnative.dev/docs/running-on-device)

If you use Android Studio to open **./wakulima-take-home/android**, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon at the upper right corner that looks like this:

![alt text](https://user-images.githubusercontent.com/40332350/98898440-14251b00-24c7-11eb-8c63-0304c3407bb5.png)

If you have recently installed Android Studio, you will likely need to create a new AVD. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Q API Level 29 image.

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

### OSX setup

Install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 9.4 or newer.

#### Command line tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![alt text](https://user-images.githubusercontent.com/40332350/98899716-957dad00-24c9-11eb-82b5-7cf41138b352.png)

#### Installing an iOS Simulator in Xcode

To install a simulator, open **Xcode > Preferences...** and select the Components tab. Select a simulator with the corresponding version of iOS you wish to use.

#### CocoaPods

Run this command in Terminal:

```
sudo gem install cocoapods
```
## Check environments status

Run the following command to be sure that system configured properly:

```
react-native doctor
```
![alt text](https://user-images.githubusercontent.com/49749955/98922619-b81cbf80-24e3-11eb-850b-54a6776a49b6.png)

## Building and running on device or emulator/simulator

### Tools

Node.js is supplied with **npm** (Node Package Manager). Nevertheless, it's supposed that you will use [Yarn](https://yarnpkg.com/) - package manager that replaces the existing workflow for the **npm** client or other package managers while remaining compatible with the **npm** registry.

To install **Yarn** run the following command in Terminal:

```
brew install yarn
```

### Preparing for build

Go to root project directory, contaning **package.json** file, and run
```
yarn
```
or
```
yarn install
```
if you prefer to be verbose.

This command will install so called **node_modules** - packages and libraries, containing js and native code necessary for building and running application.

> Notes on package.json:
> This file contains list of packages used in project: **dependencies** - packages which will be included in build, **devDependencies** - packages used durng development and not included in build.
> Block called **scripts** contains commands for *yarn* or *npm*. Actually these are aliases for Terminal commnads. For instance, if you want to launch *Metro bundler*, you must run
> ```
> yarn start
> ````

After installation of node_modules you need to run
```
yarn pods
```
to install **pods** for iOS part of the project

### Running on android device

To run application in device you will need to enable USB Debugging on your device in order to install your app during development.

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to **Settings → About phone → Software information** and then tapping the **Build number** row at the bottom seven times. You can then go back to **Settings → Developer options** to enable "USB debugging".

Plug in you device via USB to your development machine. Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running
```
adb devices
```
The output is supposed to be
```
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```
Now run
```
yarn android
```
to build and run application on your device

### Running on android emulator

You may launch emulator via Android studio by launchig and it and then pressing familiar icon

![alt text](https://user-images.githubusercontent.com/40332350/98898440-14251b00-24c7-11eb-8c63-0304c3407bb5.png)

This action will show thr list of virtual diveces. Feel free then to press "play" button in last column in order to launch device. Once virtual device is ready, you may run
```
yarn android
```
to build and run application on emulator

***or***

you may want to make your life a little bit easier. If so - follow next steps:

Run
```
emulator -list-avds
```
in Terminal to get list of names of virtual devices (avds).

Then go to the root folder of your machine and open with editor of your choice **~/.bashrc** (or **~/.zshrc** if you prefer zsh) file. Add the following line:
```
alias <aliasName>="emulator -no-snapshot @<avdName>"
```
For example:
```
alias pixel="emulator -no-snapshot @Pixel"
```
***Don't forget to save your changes*** =)

After that you are able to run **aliasName** in the Terminal to quickly launch emulator and run
```
yarn android
```
to build the app.

### Running on iOS device

Connect your iOS device to your Mac using a USB to Lightning cable. Navigate to the ios folder in project and open **.xcworkspace**, within it using Xcode.

If this is your first time running an app on your iOS device, you may need to register your device for development. Open the **Product** menu from Xcode's menubar, then go to **Destination**. Look for and select your device from the list. Xcode will then register your device for development.

Register for an Apple developer account if you don't have one yet.

Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab.
Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown. Do the same for the tests target (it ends with Tests, and is below your main target).
Repeat this step for the Tests target in your project.

![alt text](https://user-images.githubusercontent.com/40332350/98911127-8c96d680-24dd-11eb-9f67-f8f10fb32c6e.png)

If everything is set up correctly, your device will be listed as the build target in the Xcode toolbar, and it will also appear in the Devices pane (⇧⌘2). You can now press the Build and run button (⌘R) or select Run from the Product menu. Your app will launch on your device shortly.

![alt text](https://user-images.githubusercontent.com/40332350/98911351-e6979c00-24dd-11eb-9092-df86fd8223ac.png)

### Running on iOS simulator

Run simulator via Xcode or launch directly as an app and simply run in your Terminal:
```
yarn ios
```

## Daily workflow

When you run
```
yarn ios
```
or
```
yarn android
```

you will see that a new instance of Terminal is launched and it runs some process. This is *Metro bundler* responsible for work with js code.

Actually, firstly you may run
```
yarn start
```
to run Metro bundler and then, in a new instance of Terminal, you may run
```
yarn ios
```
or
```
yarn android
```

When developing with React Native, you don't need to rebuild an app with every change of js code. Running app will restart itself automatically an apply changes you made. You need to rebuild your app only when you made some changes to the native code. For instance you added some library, that ships with some chunk of native code, you modified *AndroidManifest.xml* to add some capabilities to the application or added some pods to iOS part of the project.

So, once you built your project on virtual/physical device, you may follow these steps on daily basis:

- Launch virtual/physical device
- run **yarn start** to launch Metro bundler
- open application on device

***You are good to go!***

Once you are in need to rebuild your app - do so and return to your usual development process.

There are more useful tricks to explore. Feel free to explore [this](https://reactnative.dev/docs/running-on-device) page.

## Project Structure
    .
    ├── __tests__               # Test files
    ├── android                 # Anroid specific files
    ├── ios                     # iOS specific files
    ├── src                     # Source files
    ├── .env                    # Environment variables
    ├── App.tsx                 # Main Application component
    ├── index.provider.tsx      # React Native entry file
    ├── package.json            # Node modules file
    └── README.md

## Source files
    .
    |── ...
    |── src                   # Source files
        ├── assets            # App images and icons
        ├── components        # UI reuseable components
        ├── config             # Application configurations
        ├── helpers           # reusable generalised functions
        ├── hooks             # React custom hooks folder
        ├── screens           # App UI view components
        ├── services          # App sevices (navigations, api, geo locations)
        ├── store             # App persistance source files
        ├── theme             # Application wide styles and theming
        ├── types             # Typescript application types folder
