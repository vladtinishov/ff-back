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

  create(tableName: string, dto: Record<string, any>) {
    const data = this.getTableData(tableName)
    let lastId = 0

    if (data.length) {
      lastId = data.reduce((a: any, b: any) => Math.max(a.id, b.id), -Infinity);
    }
    
    if (!data) return false

    data.id = lastId + 1
    data.push(dto)

    this.writeFile(tableName, data)

    return data
  }
}
