import { Injectable } from '@nestjs/common';

const fs = require('fs');

@Injectable()
export class JsonWorkerService {
  getFilePath(fileName: string) {
    return './tables/' + fileName + '.json'
  }

  readFile(fileName: string) {
    const fileContent = fs.readFileSync(this.getFilePath(fileName), 'utf8');

    if (!fileContent) return false

    return fileContent
  }

  writeFile(fileName: string, content: Array<Record<string, any>>) {
    const stringifiedData = JSON.stringify(content)
    return fs.writeFileSync(this.getFilePath(fileName), stringifiedData, 'utf8');
  }

  getTableData(tableName: string) {
    const tableStringified = this.readFile(tableName)

    if (!tableStringified) return false
    
    return JSON.parse(tableStringified)
  }

  getMany(tableName: string, criteria?: Record<string, any>) {
    const data = this.getTableData(tableName)

    if (!data) return false

    if (criteria) {
      return data.filter((row: any) => {
        for (const field in criteria) {
          if (row[field] !== criteria[field]) return false
        }
  
        return true
      })
    }

    return data
  }

  findOne(tableName: string, criteria: Record<string, any>) {
    const data = this.getTableData(tableName)

    if (!data) return false

    return data.find((row: any) => {
      for (const field in criteria) {
        if (row[field] !== criteria[field]) return false
      }

      return true
    })
  }

  delete(tableName: string, criteria: Record<string, any>) {
    const data = this.getTableData(tableName)

    if (!data) return false

    const res = data.filter((row: any) => {
      for (const field in criteria) {
        if (row[field] !== criteria[field]) return true
      }

      return false
    })

    this.writeFile(tableName, res)
  }

  create(tableName: string, dto: Record<string, any>) {
    const data = this.getTableData(tableName)
    let lastId = 0

    if (data.length) {
      lastId = data[data.length - 1].id
    }
    
    if (!data) return false

    dto.id = lastId + 1
    data.push(dto)

    this.writeFile(tableName, data)

    return data
  }

  edit(tableName: string, dto: Record<string, any>, criteria: Record<string, any>) {
    const data = this.getTableData(tableName)
    if (!data) return false
    
    const index = data.findIndex(row => {
      for (const field in criteria) {
        if (row[field] !== criteria[field]) return false
      }

      return true
    });

    data[index] = dto
    this.writeFile(tableName, data)

    return data
  }

  leftJoin(data: any[], tableName: string, field1: string, field2: string): any[] {
    const joinableData: any[] = this.getTableData(tableName)

    let res = []

    if (!data.length) return []
    data.forEach(row => {
      const resData = {...row, [tableName]: []}
      resData[tableName].push(...joinableData.filter(joinableRow => {
        return row[field1] === joinableRow[field2]
      }))

      res.push(resData)
    })

    return res
  }

  joinMany(data: any[], mainTable: string, serviceTable: string, idField: string, idField2: string) {
    const serviceData: any[] = this.getTableData(serviceTable)
    const mainData: any[] = this.getTableData(mainTable)
    const res = []

    data.forEach(row => {
      const resData = {...row, [mainTable]: []}
      serviceData.forEach(serviceRow => {
        if (row.id === serviceRow[idField]) {
          resData[mainTable].push(mainData.find(mainRow => {
            return mainRow.id === serviceRow[idField2]
          }))
        }
      })

      res.push(resData)
    })

    return res
  }
}
