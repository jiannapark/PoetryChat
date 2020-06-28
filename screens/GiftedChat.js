// import React from 'react';

// class GiftedChat extends React.Component {
//   state = {
//     isInitialized: false, // initialization will calculate maxHeight before rendering the chat
//     composerHeight: this.props.minComposerHeight,
//     messagesContainerHeight: undefined,
//     typingDisabled: false,
//     text: undefined,
//     messages: undefined,
//   }

//   componentDidMount() {
//     const { messages, text } = this.props
//     this.setMessages(messages || [])
//     this.setTextFromProp(text)
//   }

//   componentDidUpdate(prevProps = {}) {
//     const { messages, text, inverted } = this.props

//     if (this.props !== prevProps) {
//       this.setMessages(messages || [])
//     }

//     if (
//       inverted === false &&
//       messages &&
//       prevProps.messages &&
//       messages.length !== prevProps.messages.length
//     ) {
//       setTimeout(() => this.scrollToBottom(false), 200)
//     }

//     if (text !== prevProps.text) {
//       this.setTextFromProp(text)
//     }
//   }

//   setTextFromProp(textProp) {
//     // Text prop takes precedence over state.
//     if (textProp !== undefined && textProp !== this.state.text) {
//       this.setState({ text: textProp })
//     }
//   }

//   getTextFromProp(fallback: string) {
//     if (this.props.text === undefined) {
//       return fallback
//     }
//     return this.props.text
//   }

//   setMessages(messages = []) {
//     this.setState({ messages })
//   }

//   getMessages() {
//     return this.state.messages
//   }

//   setMaxHeight(height: number) {
//     this._maxHeight = height
//   }

//   getMaxHeight() {
//     return this._maxHeight
//   }

//   setKeyboardHeight(height: number) {
//     this._keyboardHeight = height
//   }

//   getKeyboardHeight() {
//     if (Platform.OS === 'android' && !this.props.forceGetKeyboardHeight) {
//       // For android: on-screen keyboard resized main container and has own height.
//       // @see https://developer.android.com/training/keyboard-input/visibility.html
//       // So for calculate the messages container height ignore keyboard height.
//       return 0
//     }
//     return this._keyboardHeight
//   }

//   setBottomOffset(value: number) {
//     this._bottomOffset = value
//   }

//   getBottomOffset() {
//     return this._bottomOffset
//   }

//   setIsFirstLayout(value: boolean) {
//     this._isFirstLayout = value
//   }

//   getIsFirstLayout() {
//     return this._isFirstLayout
//   }

//   setIsTypingDisabled(value: boolean) {
//     this.setState({
//       typingDisabled: value,
//     })
//   }

//   getIsTypingDisabled() {
//     return this.state.typingDisabled
//   }

//   setIsMounted(value: boolean) {
//     this._isMounted = value
//   }

//   getIsMounted() {
//     return this._isMounted
//   }

//   getMinInputToolbarHeight() {
//     return this.props.renderAccessory
//       ? this.props.minInputToolbarHeight! * 2
//       : this.props.minInputToolbarHeight
//   }

//   calculateInputToolbarHeight(composerHeight: number) {
//     return (
//       composerHeight +
//       (this.getMinInputToolbarHeight()! - this.props.minComposerHeight!)
//     )
//   }

//   /**
//    * Returns the height, based on current window size, without taking the keyboard into account.
//    */
//   getBasicMessagesContainerHeight(composerHeight = this.state.composerHeight) {
//     return (
//       this.getMaxHeight()! - this.calculateInputToolbarHeight(composerHeight!)
//     )
//   }

//   /**
//    * Returns the height, based on current window size, taking the keyboard into account.
//    */
//   getMessagesContainerHeightWithKeyboard(
//     composerHeight = this.state.composerHeight,
//   ) {
//     return (
//       this.getBasicMessagesContainerHeight(composerHeight) -
//       this.getKeyboardHeight() +
//       this.getBottomOffset()
//     )
//   }

//   safeAreaSupport = (bottomOffset: number) => {
//     return bottomOffset === this._bottomOffset
//       ? this.getBottomOffset()
//         ? this.getBottomOffset()
//         : getBottomSpace()
//       : bottomOffset
//   }

//   onKeyboardWillShow = (e: any) => {
//     if (this.props.isKeyboardInternallyHandled) {
//       this.setIsTypingDisabled(true)
//       this.setKeyboardHeight(
//         e.endCoordinates ? e.endCoordinates.height : e.end.height,
//       )
//       this.setBottomOffset(this.safeAreaSupport(this.props.bottomOffset!))
//       const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard()
//       this.setState({
//         messagesContainerHeight: newMessagesContainerHeight,
//       })
//     }
//   }

//   onKeyboardWillHide = (_e: any) => {
//     if (this.props.isKeyboardInternallyHandled) {
//       this.setIsTypingDisabled(true)
//       this.setKeyboardHeight(0)
//       this.setBottomOffset(0)
//       const newMessagesContainerHeight = this.getBasicMessagesContainerHeight()
//       this.setState({
//         messagesContainerHeight: newMessagesContainerHeight,
//       })
//     }
//   }

//   onKeyboardDidShow = (e: any) => {
//     if (Platform.OS === 'android') {
//       this.onKeyboardWillShow(e)
//     }
//     this.setIsTypingDisabled(false)
//   }

//   onKeyboardDidHide = (e: any) => {
//     if (Platform.OS === 'android') {
//       this.onKeyboardWillHide(e)
//     }
//     this.setIsTypingDisabled(false)
//   }

//   scrollToBottom(animated = true) {
//     if (this._messageContainerRef && this._messageContainerRef.current) {
//       const { inverted } = this.props
//       if (!inverted) {
//         this._messageContainerRef.current.scrollToEnd({ animated })
//       } else {
//         this._messageContainerRef.current.scrollToOffset({
//           offset: 0,
//           animated,
//         })
//       }
//     }
//   }

//   renderMessages() {
//     const { messagesContainerStyle, ...messagesContainerProps } = this.props
//     const fragment = (
//       <View
//         style={[
//           {
//             height: this.state.messagesContainerHeight,
//           },
//           messagesContainerStyle,
//         ]}
//       >
//         <MessageContainer<TMessage>
//           {...messagesContainerProps}
//           invertibleScrollViewProps={this.invertibleScrollViewProps}
//           messages={this.getMessages()}
//           forwardRef={this._messageContainerRef}
//           isTyping={this.props.isTyping}
//         />
//         {this.renderChatFooter()}
//       </View>
//     )

//     return this.props.isKeyboardInternallyHandled ? (
//       <KeyboardAvoidingView enabled>{fragment}</KeyboardAvoidingView>
//     ) : (
//       fragment
//     )
//   }

//   onSend = (messages: TMessage[] = [], shouldResetInputToolbar = false) => {
//     if (!Array.isArray(messages)) {
//       messages = [messages]
//     }
//     const newMessages: TMessage[] = messages.map(message => {
//       return {
//         ...message,
//         user: this.props.user!,
//         createdAt: new Date(),
//         _id: this.props.messageIdGenerator && this.props.messageIdGenerator(),
//       }
//     })

//     if (shouldResetInputToolbar === true) {
//       this.setIsTypingDisabled(true)
//       this.resetInputToolbar()
//     }
//     if (this.props.onSend) {
//       this.props.onSend(newMessages)
//     }

//     if (shouldResetInputToolbar === true) {
//       setTimeout(() => {
//         if (this.getIsMounted() === true) {
//           this.setIsTypingDisabled(false)
//         }
//       }, 100)
//     }
//   }

//   resetInputToolbar() {
//     if (this.textInput) {
//       this.textInput.clear()
//     }
//     this.notifyInputTextReset()
//     const newComposerHeight = this.props.minComposerHeight
//     const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(
//       newComposerHeight,
//     )
//     this.setState({
//       text: this.getTextFromProp(''),
//       composerHeight: newComposerHeight,
//       messagesContainerHeight: newMessagesContainerHeight,
//     })
//   }

//   focusTextInput() {
//     if (this.textInput) {
//       this.textInput.focus()
//     }
//   }

//   onInputSizeChanged = (size: { height: number }) => {
//     const newComposerHeight = Math.max(
//       this.props.minComposerHeight!,
//       Math.min(this.props.maxComposerHeight!, size.height),
//     )
//     const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(
//       newComposerHeight,
//     )
//     this.setState({
//       composerHeight: newComposerHeight,
//       messagesContainerHeight: newMessagesContainerHeight,
//     })
//   }

//   onInputTextChanged = (text: string) => {
//     if (this.getIsTypingDisabled()) {
//       return
//     }
//     if (this.props.onInputTextChanged) {
//       this.props.onInputTextChanged(text)
//     }
//     // Only set state if it's not being overridden by a prop.
//     if (this.props.text === undefined) {
//       this.setState({ text })
//     }
//   }

//   notifyInputTextReset() {
//     if (this.props.onInputTextChanged) {
//       this.props.onInputTextChanged('')
//     }
//   }

//   onInitialLayoutViewLayout = (e) => {
//     const { layout } = e.nativeEvent
//     if (layout.height <= 0) {
//       return
//     }
//     this.notifyInputTextReset()
//     this.setMaxHeight(layout.height)
//     const newComposerHeight = this.props.minComposerHeight
//     const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(
//       newComposerHeight,
//     )
//     const initialText = this.props.initialText || ''
//     this.setState({
//       isInitialized: true,
//       text: this.getTextFromProp(initialText),
//       composerHeight: newComposerHeight,
//       messagesContainerHeight: newMessagesContainerHeight,
//     })
//   }

//   onMainViewLayout = (e: any) => {
//     // fix an issue when keyboard is dismissing during the initialization
//     const { layout } = e.nativeEvent
//     if (
//       this.getMaxHeight() !== layout.height ||
//       this.getIsFirstLayout() === true
//     ) {
//       this.setMaxHeight(layout.height)
//       this.setState({
//         messagesContainerHeight:
//           this._keyboardHeight > 0
//             ? this.getMessagesContainerHeightWithKeyboard()
//             : this.getBasicMessagesContainerHeight(),
//       })
//     }
//     if (this.getIsFirstLayout() === true) {
//       this.setIsFirstLayout(false)
//     }
//   }

//   renderInputToolbar() {
//     const inputToolbarProps = {
//       ...this.props,
//       text: this.getTextFromProp(this.state.text!),
//       composerHeight: Math.max(
//         this.props.minComposerHeight!,
//         this.state.composerHeight!,
//       ),
//       onSend: this.onSend,
//       onInputSizeChanged: this.onInputSizeChanged,
//       onTextChanged: this.onInputTextChanged,
//       textInputProps: {
//         ...this.props.textInputProps,
//         ref: (textInput: any) => (this.textInput = textInput),
//         maxLength: this.getIsTypingDisabled() ? 0 : this.props.maxInputLength,
//       },
//     }
//     if (this.props.renderInputToolbar) {
//       return this.props.renderInputToolbar(inputToolbarProps)
//     }
//     return <InputToolbar {...inputToolbarProps} />
//   }

//   renderChatFooter() {
//     if (this.props.renderChatFooter) {
//       return this.props.renderChatFooter()
//     }
//     return null
//   }

//   renderLoading() {
//     if (this.props.renderLoading) {
//       return this.props.renderLoading()
//     }
//     return null
//   }

//   render() {
//     if (this.state.isInitialized === true) {
//       const { wrapInSafeArea } = this.props
//       const Wrapper = wrapInSafeArea ? SafeAreaView : View

//       return (
//         <Wrapper style={styles.safeArea}>
//           <ActionSheetProvider
//             ref={(component: any) => (this._actionSheetRef = component)}
//           >
//             <View style={styles.container} onLayout={this.onMainViewLayout}>
//               {this.renderMessages()}
//               {this.renderInputToolbar()}
//             </View>
//           </ActionSheetProvider>
//         </Wrapper>
//       )
//     }
//     return (
//       <View style={styles.container} onLayout={this.onInitialLayoutViewLayout}>
//         {this.renderLoading()}
//       </View>
//     )
//   }
// }
