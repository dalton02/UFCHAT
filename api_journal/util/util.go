package util

import (
    "fmt"
	"strconv"
    "strings"
)


func ArrayToInt(tmpString[]string)(tmpInt[]int){
	var tmp []int
	
	for _, str := range tmpString {
    	num,err:=strconv.Atoi(str)
    	if err != nil {
			fmt.Printf("Erro ao converter %s para inteiro: %v\n", str, err)
			return nil	
		}
		tmp = append(tmp, num)	
    	}
    return tmp
}

func ArrayToString(array []int) string {
    // Converter cada número em uma string
    var strNumbers []string
    
    for _, num := range array {
        strNumbers = append(strNumbers, fmt.Sprintf("%d", num))
    }
    
    numbersString := strings.Join(strNumbers, ",")

    result := fmt.Sprintf("{%s}", numbersString)
    return result
}
