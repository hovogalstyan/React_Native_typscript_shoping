import React, { FC, useCallback } from "react";
import { Image, SafeAreaView, Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { BackIcon, DecrementsIcons, IncrementsIcon, RetIcon } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { ProductItemTypes, useAppDispatch, useAppSelector } from "../../type/types";
import useToggle from "../../components/Hooks/useToggle";
import { decreasedItemQuantity, incrementItemQuantity } from "../../store/features/Description.Slice";
import { addToCard } from "../../store/features/Card.Slice";

interface ImgBlockProps {
  images: any;
}

interface ItemContactProps {
  item: ProductItemTypes;
}

const { width, height } = Dimensions.get("window");
const IMG_W = width * 0.8 + 20;
const IMG_H = height * 0.3;
const ImagesBlock: FC<ImgBlockProps> = ({ images }) => {
  return (
    <View style={{
      width: "100%",
      alignItems: "center",
      paddingVertical: 15
    }}>
      <View style={{
        width: "95%",
        paddingVertical: 25,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        borderRadius: 10
      }}>
        <Image
          source={images}
          style={{
            width: IMG_W,
            height: IMG_H,
            resizeMode: "cover"
          }} />
      </View>
    </View>
  );
};
const JuicesComponents = () => {
  const state = useAppSelector(state => state.DescriptionSlice.juicesList);
  return (
    <View style={{
      paddingVertical: 15
    }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={state}
        renderItem={({ item }) => (
          <View style={{
            paddingVertical: 7,
            paddingHorizontal: 7
          }}>
            <TouchableOpacity>
              <Image source={item.images}
                     style={{
                       width: 100,
                       height: 100,
                       resizeMode: "cover"
                     }} />
            </TouchableOpacity>
            <View style={{
              alignItems: "center"
            }}>
              <Text style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "700"
              }}>{item.name}</Text>
              <Text style={{
                color: "blue",
                fontWeight: "800",
                fontSize: 17
              }}>{item.price} AMD</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const ItemContent: FC<ItemContactProps> = ({ item }) => {
  const [moreText, toggleClickText] = useToggle(false);
  const dispatch = useAppDispatch();
  const incrementQuantity = useCallback(() => {
    dispatch(incrementItemQuantity());
  }, []);
  const decreasedQuantity = useCallback(() => {
    dispatch(decreasedItemQuantity());
  }, []);
  const addCardItem = useCallback((item:ProductItemTypes)=>{
     dispatch(addToCard(item))
  },[])
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#fff",
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      paddingTop:25,
      paddingHorizontal: 25
    }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 11,
            paddingHorizontal: 11,
            backgroundColor: "blue",
            borderRadius: 20
          }}>
            <RetIcon width={"20"} height={"20"} />
            <Text style={{
              fontSize: 15,
              color: "#fff",
              fontWeight: "600",
              marginLeft: 8
            }}>4.5</Text>
          </View>
          <Text style={{
            color: "blue",
            fontWeight: "700",
            fontSize: 18
          }}>
            {item.price * item.quantity} AMD
          </Text>
        </View>
        <View style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 16
        }}>
          <Text style={{
            color: "#000",
            fontSize: 20,
            fontWeight: "700"
          }}>{item.name}</Text>
          <View style={{
            width: "22%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <TouchableOpacity onPress={decreasedQuantity}>
              <DecrementsIcons width={"25"} height={"25"} fill={"#000"} />
            </TouchableOpacity>
            <Text style={{
              color: "#000",
              fontWeight: "600",
              fontSize: 20
            }}>{item.quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity}>
              <IncrementsIcon width={"25"} height={"25"} fill={"#000"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          paddingVertical: 18
        }}>
          <Text style={{
            color: "#000",
            fontWeight: "600",
            fontSize: 16,
            textAlign: "center"
          }}>
            {
              moreText ? item.description : `${item.description.substring(0, 35)}...`
            }
            <Text
              onPress={toggleClickText}
              style={{
                color: moreText ? "blue" : "red",
                fontSize: 20,
                fontWeight: "800"
              }}> {moreText ? "Less" : "More"}</Text>
          </Text>
        </View>
        <JuicesComponents />
       <View style={{
         paddingBottom:15
       }}>
         <TouchableOpacity
           onPress={() => addCardItem(item)}
           style={{
           backgroundColor:'blue',
           paddingVertical:12,
           borderRadius:25,
           alignItems:'center'
         }} >
           <Text style={{
             fontSize:23,
             fontWeight:'900',
             color:'#ffffff'
           }}>Add to carts</Text>
         </TouchableOpacity>
       </View>
      </ScrollView>
    </View>
  );
};

const Description: FC = () => {
  const { goBack } = useNavigation();
  const state = useAppSelector(state => state.DescriptionSlice.productItem);
  return (
    state &&
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "blue"
    }}>
      <View>
        <TouchableOpacity
          onPress={() => goBack()}
          style={{
            width: 45,
            height: 25,
            marginLeft: 5,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center"
          }}>
          <BackIcon width={"30"} height={"30"} fill={"#fff"} />
        </TouchableOpacity>
      </View>
      <ImagesBlock images={state.img} />
      <ItemContent item={state} />

    </SafeAreaView>
  );
};

export default Description;
