import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AgendaModalForm from '../molecules/AgendaModalForm'; 


LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const AgendaList = () => {
  const [items, setItems] = useState({
    '2024-09-07': [{ name: 'Evento' }],
    '2024-02-14': [{ name: 'Dia dos Namorados' }],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formatDate = (date) => format(new Date(date), 'dd MMMM yyyy', { locale: ptBR });

  const handleSaveEvent = (date, name) => {
    setItems((prevItems) => ({
      ...prevItems,
      [date]: [...(prevItems[date] || []), { name }],
    }));
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={new Date().toISOString().split('T')[0]}
        monthFormat={'MMMM yyyy'}
        onMonthChange={(month) => {
          console.log('Mês alterado: ', month);
        }}
        onDayPress={(day) => {
          console.log('Dia selecionado: ', formatDate(day.dateString));
        }}
        enableSwipeMonths={true}
        renderEmptyData={() => <Text style={styles.emptyText}>Nenhum evento para mostrar</Text>}
        theme={{
          selectedDayBackgroundColor: '#6750a4',
          selectedDayTextColor: '#fff',
          todayTextColor: '#6750a4',
          dayTextColor: 'rgba(103, 80, 164, 0.5)',
          monthTextColor: '#6750a4',
          arrowColor: '#6750a4',
          agendaDayTextColor: '#fff',
          agendaDayNumColor: '#fff',
          agendaTodayColor: '#6750a4',
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <AgendaModalForm
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#6750a4',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
  },
});

export default AgendaList;
