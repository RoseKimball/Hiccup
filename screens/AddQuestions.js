import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

const AddQuestions = () => {
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [editQuestionActive, setEditQuestionActive] = useState(null);
    const [changedQuestion, setChangedQuestion] = useState('');
  
    const questionInputHandler = (enteredQuestion) => {
      setQuestion(enteredQuestion);
    }
  
    const addQuestionHandler = () => {
      // console.log(question)
      setQuestion('');
      setQuestions(currentQuestions => [...currentQuestions, question])
    }
  
    const deleteQuestionHandler = (question) => {
      let currQuestions = [...questions]
      let index = questions.indexOf(question);
      currQuestions.splice(index, 1);
      setQuestions(currQuestions);
    }
  
    const editQuestionHandler = (id) => {
      setEditQuestionActive(id);
    }
  
    const changedQuestionInputHandler = (changedQuestion) => {
      setChangedQuestion(changedQuestion);
    }
  
    const changedQuestionHandler = (selectedQuestion) => {
      let currQuestions = [...questions];
      let index = questions.indexOf(selectedQuestion);
      currQuestions.splice(index, 1, changedQuestion)
      setQuestions(currQuestions);
      setEditQuestionActive(false);
    }
  
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Add your own questions!</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input} 
            placeholder="Question" 
            onChangeText={questionInputHandler}
            value={question}
          />
          <Button title="ADD" onPress={addQuestionHandler}/>
        </View>
        <ScrollView>
            {questions.map((q, i) => (
                <View key={i} style={styles.questionWrapper}>
                    <View style={styles.question}>
                    <Text style={styles.text}>{q}</Text> 
                    <View style={styles.changeEdit}>
                        <Button color='red' title='X' onPress={() => deleteQuestionHandler(q)}/>
                        <Button color='red' title='EDIT' onPress={() => editQuestionHandler(i)}/>
                    </View>
                    </View>
                    {editQuestionActive === i ? (
                    <View style={styles.inputWrapper}>
                        <TextInput
                        style={styles.input}
                        placeholder='Edit Question'
                        onChangeText={changedQuestionInputHandler}
                        value={changedQuestion}
                        />
                        <Button title='CHANGE' onPress={() => changedQuestionHandler(q)}/>
                    </View>
                    ) : null}
                </View>
            ))}
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 40
    },
    singleQuestion: {
      flexDirection: 'column'
    },
    title: {
      paddingBottom: 10
    },
    inputWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10
    },
    input: {
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      width: '80%'
    },
    questionWrapper: {
      flexDirection: 'column',
      padding: 10
    },
    question: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginVertical: 10
    },
    text: {
      fontWeight: 'bold',
      fontSize: 20,
      padding: 10,
      backgroundColor: '#ccc',
      borderColor: 'black',
      borderWidth: 1
    },
    changeEdit: {
      flexDirection: 'row'
    }
  });

export default AddQuestions;