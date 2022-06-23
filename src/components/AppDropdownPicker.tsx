import * as React from 'react';
import DropdownPicker from 'react-native-dropdown-picker';

type IProps = React.ComponentProps<typeof DropdownPicker>;

const AppDropdownPicker: React.FC<IProps> = props => {
  const propsWithTheme = {
    ...props,
  };
  return <DropdownPicker {...propsWithTheme} />; // work
};

export default AppDropdownPicker;
{/* <AppDropdownPicker
open={open}
setOpen={setOpen}
value={value}
placeholder={'asdasd'}
setValue={setValue}
onSelectItem={item=>console.log("abc "+item)}
onPress={(open) => console.log('was the picker open?', open)}
onChangeValue={(value) => {
  console.log("SDSADAS"+value);
}}
disabledStyle={{
  opacity: 0.5
}}
labelStyle={{
  fontWeight: "bold"
}}
labelProps={{
  numberOfLines: 5
}}
max={50}
maxHeight={200}
onOpen={() => console.log('hi!')}
onClose={() => console.log('bye!')}
items={items}
setItems={setItems}
style={{borderWidth:0,zIndex:1,height:40}}
dropDownContainerStyle={{
  borderWidth:0,
  elevation:5
}}
/> */}
