import { Text, Pressable, View } from 'react-native'
import React from 'react'
import { fontWeight500 } from '../../assets/Styles/FontWeights'

const selectedFilter = 'bg-[#e8b05c] p-2 rounded-xl flex-1 mx-1 active:scale-95'
const filterCard = 'bg-white p-2 rounded-xl flex-1 mx-1 active:scale-95'
const FilterButton = ({ filter, setFilterType, filterType }) => {
    return (
        <Pressable className={filterType === filter ? selectedFilter : filterCard} onPress={() => setFilterType(filter)}>
            <Text style={fontWeight500} className={filterType === filter ? 'text-white text-xs text-center' : 'text-xs text-center'}>{filter}</Text>
        </Pressable>
    )
}

export default FilterButton