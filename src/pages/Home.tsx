import { useState } from 'react';
import { VStack, HStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [ statusSelected, setStatusSelected ] = useState<'open' | 'closed'>('open');
  const [ orders, setOrders ] = useState<OrderProps[]>([
    {
    id: "1",
    patrimony: "123456",
    when: "18/07/2022 às 10:00",
    status: "open",
    }
  ]);

  const navigation = useNavigation();
  const { colors } = useTheme();
  
  function _handleNewOrder() {
    navigation.navigate('new');
  }

  function _handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }
  return (
    <VStack 
      flex={1}
      pb={6}
      bg="gray.700"
    >
      <HStack 
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton 
          icon={ <SignOut size={26} color={colors.gray[300] }/> }
        />

      </HStack>

      <VStack flex={1} px={6}>
        <HStack 
          w="full" 
          mt={8} 
          mb={4} 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Heading color="gray.100">
            Solicitações
          </Heading>

          <Text color="gray.200">
            { orders.length }
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter 
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          
          <Filter 
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />        
        </HStack>

        <FlatList
          keyExtractor={item => item.id}
          data={orders}
          renderItem={({ item }) => <Order data={item} onPress={() => _handleOpenDetails(item.id)} />}          
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" textAlign="center">
                Você ainda não possui {'\n'}
                solicitações { statusSelected === "open" ? "em andamento" : "finalizadas"}
              </Text>
            </Center>
          )}
        />

        <Button 
          title="Nova solicitação" 
          onPress={_handleNewOrder}
        />
      </VStack>
    </VStack>
  );
}