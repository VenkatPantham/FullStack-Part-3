import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

const RenderDish = (props) => {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={({ flex: 1 }, { flexDirection: "row" })}>
            <View style={({ flex: 1 }, { alignSelf: "flex-end" })}>
              <Icon
                raised
                reverse
                name={props.favorite ? "heart" : "heart-o"}
                type="font-awesome"
                color="#f50"
                onPress={() =>
                  props.favorite
                    ? console.log("Already Favorited")
                    : props.markFavorite()
                }
              />
            </View>
            <View style={({ flex: 1 }, { alignSelf: "flex-start" })}>
              <Icon
                raised
                reverse
                name={"pencil"}
                type="font-awesome"
                color="#512DA8"
                onPress={() => props.toggleModal()}
              />
            </View>
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
};

const RenderComments = ({ comments }) => {
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={({ fontSize: 14 }, { paddingBottom: 10 })}>
          {item.comment}
        </Text>
        <Rating
          imageSize={10}
          readonly
          startingValue={item.rating}
          style={({ flex: 1 }, { alignItems: "flex-start" })}
        />
        <Text style={({ fontSize: 12 }, { paddingTop: 10 })}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
};

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      author: "",
      comment: "",
      showModal: false,
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  handleComment(dishId) {
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.toggleModal();
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  resetForm() {
    this.setState({
      rating: 0,
      author: "",
      comment: "",
      showModal: false,
    });
  }

  render() {
    const dishId = this.props.route.params.dishId;
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          markFavorite={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <View>
              <Rating
                showRating
                startingValue={0}
                onFinishRating={(value) => this.setState({ rating: value })}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <View>
              <Input
                placeholder="Author"
                leftIcon={{ type: "font-awesome", name: "user-o" }}
                onChangeText={(value) => this.setState({ author: value })}
              />
            </View>
            <View>
              <Input
                placeholder="Comment"
                leftIcon={{ type: "font-awesome", name: "comment-o" }}
                onChangeText={(value) => this.setState({ comment: value })}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleComment(dishId);
                  this.resetForm();
                }}
                color="#512DA8"
                title="SUBMIT"
                buttonStyle={styles.button}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#808080"
                title="CANCEL"
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
  button: {
    margin: 10,
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
