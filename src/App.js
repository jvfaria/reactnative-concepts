import React, { useEffect, useState } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data),)
      .catch((e) => console.log("api error", e))
  }, []);




  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    setRepositories([response.data,...repositories.filter(rep => rep.id !== id)]);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#7159c1cc" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Repositories</Text>
        <Text style={styles.challenge}>Challenge #3 mobile</Text>

        <FlatList
          data={repositories}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>

                {
                  repository.techs.map(tech => (

                    <Text key={tech} style={styles.tech}>
                      {tech}
                    </Text>
                  ))
                }


              </View>


              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  
                  testID={`repository-likes-${repository.id}`}
                >
                  {`${repository.likes} curtidas`}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
               
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}

        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert( "*TODO*" )}

        >
          <Text style={styles.bottom}>Criar repositório</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    margin: 40,
    color: "black"
  },
  challenge: {
    fontSize: 18,
    fontWeight: "200",
    textAlign: "center",
    margin: 5,
    paddingBottom: 10,
    color: "silver"
  },
  bottom: {
    fontSize: 14,
    fontWeight: "bold",
    width: "90%",
    color: "#fff",
    backgroundColor: "#04d361cc",
    padding: 15,
    textAlign: "center",
    borderRadius: 6,
    margin: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    width: "100%",
    borderRadius: 4,
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    textAlign: "center"
  },
});
