
import { Button, StyleSheet, Text, View, Image, TextInput, Modal, FlatList, Pressable } from 'react-native';
import { useState } from 'react';




export default function App() {


  const [showHideView, setShowHideView] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(0);


  const onClose = () => {
    setShowHideView(false);
    setName('');
    setPrice(0);
    setEditId(0);
  };

  const onSave = () => {
    //nếu có editId != 0 thì là đang chỉnh sửa
    if (editId != 0) {
      const newEditList = list.map(item => {
        if (item.id == editId) {
          //gán gtri mới = gtri đã lưu ở state sau khi nhập
          item.name = name;
          item.price = price;
        }
        return item;
      });
      setList(newEditList);
      return onClose();
    }
    //1. cấu trúc dl obj mới để lưu
    const newItem = {
      id: list[list.length - 1]?.id + 1 || 1,
      name: name,
      price: price,
    };
    //2. định nghĩa mảng dl mới rồi lưu
    const newList = [...list, newItem];
    setList(newList);
    //3. đóng modal và đưa TextInput về gt mặc định
    return onClose();
  };


  const onDelete = (itemId) => {
    const newList =list.filter((item) =>{
      return item.id !== itemId;
    });
    setList(newList);
  };

  const onEdit = (editId) => {
    //1. mở modal ra
    setShowHideView(true);
    //2. tìm kiếm phần tử có id= editId
    const editItem = list.find(item => item.id == editId);
    //3. hiển thị dl của phần tử vừa tìm được
    setName(editItem.name);
    setPrice(editItem.price);
    setEditId(editId); // setEditId(editItem.editId);
  };

  return (

    <View style={styles.container}>
      {!showHideView ? <Button
        title='Thêm mới'
        onPress={() => { setShowHideView(true) }} />
        : null}
        <Modal visible={showHideView} animationType="slide">
          <View style={styles.container}>
            <Text>{name} - {price}</Text>
            <TextInput placeholder='Tên SP'
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput placeholder='Giá SP' keyboardType='numeric' value={price} onChangeText={(text) => setPrice(text)}/>
            <Button title='Hủy'
              onPress={() => onClose()}
            />
            <Button title='Lưu' 
              onPress={() => onSave()} 
            />
          </View>
        </Modal>
      <View>
        <FlatList
          data={list}
          renderItem={({ item }) => 
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Pressable onPress={() => onDelete(item.id)}>
              <Text>Xóa</Text>
            </Pressable>
            <Pressable onPress={() => onEdit(item.id)}>
              <Text>Sửa</Text>
            </Pressable>
          </View>}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 50,
    margin: 20,
  },
  info: {
    marginBottom: 15,
  },
  text: {
    fontSize: 25,
  },
  button: {
    flex: 0.1,
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
  },
  list: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
});
